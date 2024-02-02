import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isDarkTheme: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.themeChanged.subscribe((newTheme: string) => {
      this.isDarkTheme = newTheme === 'dark';
    });

    this.isDarkTheme = this.themeService.getTheme() === 'dark';
  }

  onToggle(): void {
    this.themeService.toggleTheme();
  }

  getToggleLabel(): string {
    return this.isDarkTheme ? 'Enable Light Theme' : 'Enable Dark Theme';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
