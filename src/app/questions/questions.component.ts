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
  loading: boolean = false;

  private USER_CARD_WIDTH: number = 300;
  private CARD_WIDTH_MAP: Record<number, number> = {
    1: 7,
    2: 14,
    3: 21,
  };

  @ViewChild('cards') cards: ElementRef<HTMLDivElement> | undefined;

  private width$ = new BehaviorSubject<number>(0);

  private limit: number = 0;

  // itemsAmountOnpPage: number = 0;

  constructor(private paginationService: PaginationService) {
    this.paginationService.getLoading().subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnInit() {
    this.width$.pipe(debounceTime(300)).subscribe((width) => {
      this.limit = this.getLimit(width);
      // this.itemsAmountOnpPage = this.limit;
    });
  }

  ngAfterViewInit(): void {
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        this.width$.next(entry.contentRect.width);
      });
    });

    if (this.cards?.nativeElement) {
      this.paginationService.load({
        limit: this.getLimit(this.cards.nativeElement.clientWidth),
      });

      observer.observe(this.cards.nativeElement);
    }
  }

  loadMore() {
    this.paginationService.load({ limit: this.limit });
  }

  private getLimit(width: number): number {
    return this.CARD_WIDTH_MAP[Math.floor(width / this.USER_CARD_WIDTH)] ?? 7;
  }
}
