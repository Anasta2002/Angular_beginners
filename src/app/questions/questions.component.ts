import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { PaginationService } from '../services/pagination.service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  data: any[] = [];
  loading = true;
  private dataSubscription: Subscription | undefined;
  private scrollSubject = new Subject<void>();

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {
    this.paginationService.initialize();
    this.dataSubscription = this.paginationService.data$.subscribe((newData: any[]) => {
      console.log('Data:', newData);
      this.data = newData;
      this.loading = false;
    });

    this.scrollSubject.pipe(debounceTime(200)).subscribe(() => {
      this.checkScrollPosition();
    });
  }

  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.scrollSubject.next();
  }

  private checkScrollPosition() {
    const isNearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

    if (isNearBottom) {
      this.paginationService.fetchNextPage();
    }
  }
}
