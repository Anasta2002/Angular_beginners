import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedUsers, RawUser, User } from '../models';
import { StorageItem } from '../models/storage-item';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  private cache = new StorageItem<PaginatedUsers>('users');
  private lastSearch: string | null = null;

  getUsers(
    params: {
      offset?: number;
      limit?: number;
      search?: string;
    } = {
      offset: 0,
      limit: 25,
      search: '',
    }
  ): Observable<PaginatedUsers> {
    const cache = this.cache.get();

    if (this.lastSearch === params.search && cache) {
      return of(cache);
    }
    return this.http
      .get<PaginatedUsers>(
        `https://api.slingacademy.com/v1/sample-data/users`,
        {
          params: new HttpParams()
            .set('offset', params.offset ?? 0)
            .set('limit', params.limit ?? 25)
            .set('search', params.search ?? ''),
        }
      )
      .pipe(
        tap((users) => {
          this.lastSearch = params.search ?? null;
          return this.cache.save(users);
        })
      );
  }
}
