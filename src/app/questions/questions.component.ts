import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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

  private dataSubscription: Subscription | undefined;
  private totalItemsSubscription: Subscription | undefined;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {
    this.paginationService.initialize();
    this.loadPage();

    this.dataSubscription = this.paginationService.data$.subscribe((newData: any[]) => {
      console.log('Data:', newData);
      this.data = newData;
      this.dataSource.data = newData;
      this.loading = false;
    });

    this.totalItemsSubscription = this.paginationService.totalItems$.subscribe(totalItems => {
      this.totalItems = totalItems;
      this.paginator.length = totalItems;
    });
  }

  ngOnDestroy() {
    this.dataSubscription?.unsubscribe();
    this.totalItemsSubscription?.unsubscribe();
  }

  onPageChange(event: PageEvent) {
    console.log('Page changed:', event);
    const page = event.pageIndex + 1;
    this.loadPage(page);
  }

  private loadPage(page: number = 1) {
    this.loading = true;
    this.paginationService.fetchNextPage();
  }
}
