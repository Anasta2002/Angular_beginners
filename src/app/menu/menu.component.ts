import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ThemeService} from "../services/theme.service";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})

export class MenuComponent {
  currentTheme: string | undefined;
  numberOfCartItems: number = 0;

  constructor(private themeService: ThemeService, private cartService: CartService) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.getTheme();

    this.themeService.themeChanged$.subscribe((newTheme: string) => {
      this.currentTheme = newTheme;
    });

    this.cartService.cartState$.subscribe((cartState: any[]) => {
      this.numberOfCartItems = cartState.length;
    });
  }
  onToggle(): void {
    this.themeService.toggleTheme();
  }
}
