import { ChangeDetectionStrategy, Component } from '@angular/core';
import {HomeService} from "../services/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  title = 'Practice of binding the components and keep data in .service.ts';

  constructor(private homeService: HomeService) {}

  get products() {
    return this.homeService.products;
  }

  addNewProduct(newProduct: { id: string; name: string; price: number }) {
    this.homeService.addNewProduct(newProduct);
  }
}
