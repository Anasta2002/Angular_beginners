import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AddFormModule} from "../add-form/add-form.module";
import {ItemsModule} from "../items/items.module";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  title = 'Grocery store';

  products = [
    { id: '1', name: 'cucumber', price: 10 },
    { id: '2', name: 'tomato', price: 15 },
    { id: '3', name: 'potato', price: 5 },
    { id: '4', name: 'broccoli', price: 12 },
  ];

  addNewProduct(newProduct: { id: string; name: string; price: number }) {
    this.products.push(newProduct);
    console.log('app', this.products);
  }
}
