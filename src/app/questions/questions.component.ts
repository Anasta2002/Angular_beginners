import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginationService } from '../services/pagination.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<any>();
  loading = true;
  data: any[] = [];
  totalItems = 0;
  usersNames: string[] = [];

  private dataSubscription: Subscription | undefined;
  private totalItemsSubscription: Subscription | undefined;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('bottomMarker', { static: true }) bottomMarker!: ElementRef;

  constructor(private paginationService: PaginationService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.paginationService.initialize();
    this.loadPage();

    this.dataSubscription = this.paginationService.data$.subscribe((newData: any[]) => {
      console.log('Data:', newData);
      this.data = newData;
      this.dataSource.data = newData;
      this.loading = false;
      this.cdr.detectChanges();
    });

    this.totalItemsSubscription = this.paginationService.totalItems$.subscribe(totalItems => {
      this.totalItems = totalItems;
      this.paginator.length = totalItems;
    });

    this.observeBottomMarker();

    this.usersNames = this.data.map(user => user.first_name + ' ' + user.last_name);
    console.log('user_transfer', this.usersNames)
  }

  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
    this.totalItemsSubscription?.unsubscribe();
  }

  private loadPage(page: number = 1) {
    this.loading = true;
    this.paginationService.fetchNextPage();
    console.log('loading', this.loading);
  }

  private observeBottomMarker() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadPage();
        }
      });
    });

    observer.observe(this.bottomMarker.nativeElement);
  }
}
