import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedUser } from '../models';
import { StorageItem } from '../models/storage-item';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private storageOptions = new StorageItem<PaginatedUser>('options');

  getUsers(
    params: {
      offset?: number;
      limit?: number;
      search?: string;
      getCached?: boolean;
    } = {
      offset: 0,
      limit: 25,
      search: '',
      getCached: false,
    }
  ): Observable<PaginatedUser> {
    const savedOptions = this.storageOptions.get();
    if (params.getCached && savedOptions) {
      return of(savedOptions);
    }

    return this.http
      .get<PaginatedUser>(
        `https://api.slingacademy.com/v1/sample-data/users`,
        {
          params: new HttpParams()
            .set('offset', params.offset ?? 0)
            .set('limit', params.limit ?? 25)
            .set('search', params.search ?? ''),
        }
      )
      .pipe(
        tap((response) => {
          this.storageOptions.save(response);
        })
      );
  }
}
