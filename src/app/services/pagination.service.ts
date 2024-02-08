import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$: Observable<any[]> = this.dataSubject.asObservable();

  private totalItemsSubject = new BehaviorSubject<number>(0);
  public totalItems$: Observable<number> = this.totalItemsSubject.asObservable();

  private offset = 0;
  private limit = 10;

  constructor(private http: HttpClient) {}

  initialize() {
    this.fetchData();
  }

  private fetchData() {
    const url = `https://api.slingacademy.com/v1/sample-data/users?offset=${this.offset}&limit=${this.limit}`;
    this.http.get<{ users: any[]; totalItems: number }>(url).subscribe(
      (response) => {
        const currentData = this.dataSubject.value;
        const insertionIndex = currentData.length;
        const newData = response.users.filter(newUser => !currentData.some(existingUser => existingUser.id === newUser.id));
        this.dataSubject.next([...currentData, ...newData]);
        this.totalItemsSubject.next(response.totalItems); // Update totalItems
      }
    );
  }

  public fetchNextPage() {
    this.offset += this.limit;
    this.fetchData();
  }
}
