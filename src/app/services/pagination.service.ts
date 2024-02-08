import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$: Observable<any[]> = this.dataSubject.asObservable();

  private offset = 0;
  private limit = 20;

  constructor(private http: HttpClient) {}

  initialize() {
    this.fetchData();
  }

  private fetchData() {
    const url = `https://api.slingacademy.com/v1/sample-data/users?offset=${this.offset}&limit=${this.limit}`;
    this.http.get<{ users: any[] }>(url).subscribe(
      (response) => {
        const currentData = this.dataSubject.value;
        const insertionIndex = currentData.length;
        const newData = response.users.filter(newUser => !currentData.some(existingUser => existingUser.id === newUser.id));
        this.dataSubject.next([...currentData, ...newData]);
        this.scrollToIndex(insertionIndex);
      }
    );
  }

  private scrollToIndex(index: number) {
    const element = document.querySelector(`#user-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  public fetchNextPage() {
    this.offset += this.limit;
    this.fetchData();
  }
}
