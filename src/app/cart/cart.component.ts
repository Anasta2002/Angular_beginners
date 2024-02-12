import { Component } from '@angular/core';
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  state: any[]

  constructor(private cartState: CartService) {
    this.state = this.cartState.getCartState()
    console.log('state', this.state)
  }
}
