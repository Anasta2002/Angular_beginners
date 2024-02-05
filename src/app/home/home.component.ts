import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  title = 'Practice of binding the components';

  products = [
    { id: '1', name: 'cucumber', price: 10 },
    { id: '2', name: 'tomato', price: 15 },
    { id: '3', name: 'potato', price: 5 },
    { id: '4', name: 'broccoli', price: 12 },
    { id: '5', name: 'carrot', price: 8 },
    { id: '6', name: 'lettuce', price: 7 },
    { id: '7', name: 'onion', price: 6 },
    { id: '8', name: 'bell pepper', price: 14 },
  ];


  addNewProduct(newProduct: { id: string; name: string; price: number }) {
    this.products.push(newProduct);
    console.log('app', this.products);
  }
}
