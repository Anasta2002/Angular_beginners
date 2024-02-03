import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ThemeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  currentTheme: string;

  constructor(private themeService: ThemeService) {
    this.currentTheme = this.themeService.getTheme();

    this.themeService.themeChanged$.subscribe((newTheme: string) => {
      this.currentTheme = newTheme;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
