import {Component, EventEmitter, Output } from '@angular/core';
import {ThemeService} from "../services/theme.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})

export class MenuComponent {
  // @Output() toggle = new EventEmitter<void>();
  // currentTheme: string;
  //
  // constructor(private themeService: ThemeService) {
  //   this.currentTheme = this.themeService.getTheme();
  //
  //   this.themeService.themeChanged$.subscribe((newTheme: string) => {
  //     this.currentTheme = newTheme;
  //   });
  // }
  //
  // onToggle(): void {
  //   this.toggle.emit();
  // }
  currentTheme: string;

  constructor(private themeService: ThemeService) {
    this.currentTheme = this.themeService.getTheme();

    this.themeService.themeChanged$.subscribe((newTheme: string) => {
      this.currentTheme = newTheme;
    });
  }

  onToggle(): void {
    this.themeService.toggleTheme();
  }
}
