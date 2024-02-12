import {ChangeDetectionStrategy, Component, inject, Input} from '@angular/core';
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsComponent {
  @Input() products: any[] = [];

  constructor(private cartService: CartService) {}

  deleteProduct(product: any) {
    const index = this.products.indexOf(product);

    if (index !== -1) {
      this.products = [...this.products.slice(0, index), ...this.products.slice(index + 1)];
    }
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  isProductInCart(product: any): boolean {
    return this.cartService.getCartState().some(el => el.id === product.id);
  }
}
