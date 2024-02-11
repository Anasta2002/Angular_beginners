import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { PaginationService } from '../services/pagination.service';
import { Subscription, Observable, BehaviorSubject, debounceTime } from 'rxjs';
import { User } from '../models';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent implements OnInit, AfterViewInit {
  users$: Observable<User[]> = this.paginationService.getUsers();
  loading = true;

  private USER_CARD_WIDTH: number = 300;
  private CARD_WIDTH_MAP: Record<number, number> = {
    1: 7,
    2: 14,
    3: 21,
  };

  @ViewChild('cards') cards: ElementRef<HTMLDivElement> | undefined;

  private width$ = new BehaviorSubject<number>(0);

  private limit: number = 0;

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {
    // подписываемся на наш сабжект с актуальной шириной
    // debounceTime(300) получаем новую ширину один раз в 300 миллисекунд
    // subscribe((width) -> будет ширина раз в 300 миллисекунд
    this.width$.pipe(debounceTime(300)).subscribe((width) => {
      this.limit = this.getLimit(width);
    });
  }

  ngAfterViewInit(): void {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        // entry.contentRect.width здесь всегда получаем новую ширину
        // отправляем нашу актуальную ширину в наш behavior subject
        this.width$.next(entry.contentRect.width);
      });
    });

    if (this.cards?.nativeElement) {
      // делаем в самый первый раз, когда у нас уже есть div
      // this.cards.nativeElement.clientWidth начальная ширина
      this.paginationService.load({
        limit: this.getLimit(this.cards.nativeElement.clientWidth),
      });

      // this.cards.nativeElement -> div.user-cards
      observer.observe(this.cards.nativeElement); // подписка на resize дива
    }
  }

  loadMore() {
    this.paginationService.load({ limit: this.limit });
  }

  private getLimit(width: number): number {
    return this.CARD_WIDTH_MAP[Math.floor(width / this.USER_CARD_WIDTH)] ?? 7;
  }
}
