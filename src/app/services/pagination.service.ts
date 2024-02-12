import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private usersService = inject(UsersService);
  private users$ = new BehaviorSubject<User[]>([]);
  private loading = false;
  private loading$ = new BehaviorSubject<boolean>(this.loading);

  getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  private offset = 0;

  getUsers(): Observable<User[]> {
    return this.users$.asObservable();
  }

  private fetchUsers(params: { limit: number }) {
    return this.usersService
      .getUsers({ limit: params.limit, offset: this.offset })
      .pipe(
        map((res) => {
          this.offset = this.offset + 20;

          return res.users.map((user) => new User(user));
        })
      );
  }

  load(params: { limit: number }): void {
    this.loading$.next(true);

    this.fetchUsers(params).subscribe((users) => {
      this.users$.next([...this.users$.value, ...users]);
      this.loading$.next(false);
    });
  }
}
