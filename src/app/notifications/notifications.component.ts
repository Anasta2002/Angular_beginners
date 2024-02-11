import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UsersService } from '../services/users.service';
import { RawUser } from '../models';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnInit {
  private http = inject(HttpClient);
  private cd = inject(ChangeDetectorRef);
  private usersService = inject(UsersService);
  title: string = 'Practice of get requests';

  products: any[] | undefined;

  public users$ = new BehaviorSubject<RawUser[]>([]);

  ngOnInit() {
    this.usersService
      .getUsers({ limit: 10, offset: 0 })
      .subscribe((response) => {
        this.users$.next(response.users);
      });

    setTimeout(() => {
      this.users$.next([]);
    }, 2000);
  }

  handlerClick() {
    this.users$.value;

    this.http.get<any>('https://dummyjson.com/products').subscribe((data) => {
      this.products = data.products;
      console.log(this.products);
      this.cd.markForCheck();
    });
  }
}
