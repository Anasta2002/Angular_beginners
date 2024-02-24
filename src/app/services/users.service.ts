import { Injectable, inject } from '@angular/core';
import { Observable, of, tap, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedUsers } from '../models';
import { StorageItem } from '../models/storage-item';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _http = inject(HttpClient);
  private _cache = new StorageItem<PaginatedUsers>('users');
  private _lastSearch: string | null = null;
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

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
    const cache = this._cache.get();
    
    if (this._lastSearch === params.search && cache) {
      return of(cache);
    }
    
    this._loading$.next(true)
    
    return this._http
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
          this._lastSearch = params.search ?? null;
          this._cache.save(users);
          this._loading$.next(false)
        })
      );
  }
}
