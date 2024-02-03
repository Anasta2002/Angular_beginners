import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {AddFormModule} from "./add-form/add-form.module";
import {ItemsModule} from "./items/items.module";
import {MenuModule} from "./menu/menu.module";
import {ThemeService} from "./services/theme.service";
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    AddFormModule,
    ItemsModule,
    MenuModule,
    CommonModule,
    RouterOutlet
  ],
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
