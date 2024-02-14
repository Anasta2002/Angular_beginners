import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {RawUser} from "../models";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserByIdService {
  private selectedUserId: number | null = null;

  constructor(private http: HttpClient) { }

  setSelectedUserId(userId: number): void {
    this.selectedUserId = userId;
  }

  getUserById(userId: number): Observable<RawUser> {
    return this.http.get<RawUser>(`https://api.slingacademy.com/v1/sample-data/users/${userId}`);
  }
}
