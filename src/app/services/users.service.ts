import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'https://api.slingacademy.com/v1/sample-data/users';
  private http = inject(HttpClient);

  getUsers(config: {
    limit: number;
    offset: number;
  }): Observable<PaginatedUser> {
    const params = new HttpParams()
      .set('limit', config.limit)
      .set('offset', config.offset);

    return this.http.get<PaginatedUser>(this.baseUrl, {
      params,
    });
  }
}
