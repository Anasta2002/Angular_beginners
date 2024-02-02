import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {AddFormModule} from "./add-form/add-form.module";
import {ItemsModule} from "./items/items.module";
import {MenuModule} from "./menu/menu.module";
import {ThemeService} from "./services/theme.service";
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    AddFormModule,
    ItemsModule,
    MenuModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Grocery store';
  currentTheme$: Observable<string>;

  products = [
    { id: '1', name: 'cucumber', price: 10 },
    { id: '2', name: 'tomato', price: 15 },
    { id: '3', name: 'potato', price: 5 },
    { id: '4', name: 'broccoli', price: 12 },
  ];

  constructor(private ref: ChangeDetectorRef, private themeService: ThemeService) {
    this.currentTheme$ = this.themeService.themeChanged;
  }

  addNewProduct(newProduct: { id: string; name: string; price: number }) {
    this.products.push(newProduct);
    console.log('app', this.products);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

}
