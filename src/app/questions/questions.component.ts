import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { PaginationService } from '../services/pagination.service';
import { Subscription, Observable } from 'rxjs';
import { User } from '../models';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent implements OnInit {
  users$: Observable<User[]> = this.paginationService.getUsers();
  loading = true;

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {
    this.paginationService.load();
  }

  loadMore() {
    this.paginationService.load();
  }
}
