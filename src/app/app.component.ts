import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { ThemeService } from './services/theme.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  currentTheme: string;
  private themeSubscription: Subscription;

  constructor(private themeService: ThemeService, private cdr: ChangeDetectorRef) {
    this.currentTheme = this.themeService.getTheme();

    this.themeSubscription = this.themeService.themeChanged$.subscribe((newTheme: string) => {
      this.currentTheme = newTheme;
      this.cdr.detectChanges();
      console.log('New Theme:', this.currentTheme);
      this.applyThemeStyles();
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private applyThemeStyles(): void {
    if (this.currentTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
