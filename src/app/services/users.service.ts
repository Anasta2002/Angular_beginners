import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedUsers, RawUser, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

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
    return this.http.get<PaginatedUsers>(
      `https://api.slingacademy.com/v1/sample-data/users`,
      {
        params: new HttpParams()
          .set('offset', params.offset ?? 0)
          .set('limit', params.limit ?? 25)
          .set('search', params.search ?? ''),
      }
    );
  }
}
