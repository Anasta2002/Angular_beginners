import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentTheme = 'light';
  private themeChangedSource = new Subject<string>();

  themeChanged$ = this.themeChangedSource.asObservable();

  getTheme(): string {
    return this.currentTheme;
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.themeChangedSource.next(this.currentTheme);
    console.log('New Theme:', this.currentTheme);
  }
}
