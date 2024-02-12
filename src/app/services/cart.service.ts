import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartStateSubject = new BehaviorSubject<any[]>([]);
  cartState$ = this.cartStateSubject.asObservable();

  getCartState(): any[] {
    return this.cartStateSubject.value;
  }

  addToCart(item: any): void {
    this.cartStateSubject.next([...this.cartStateSubject.value, item]);
  }

  removeFromCart(item: any): void {
    const updatedCartState = this.cartStateSubject.value.filter((product) => product.id !== item.id);
    this.cartStateSubject.next(updatedCartState);
  }
  constructor() {
    console.log('cartState',this.cartState$);
  }
}
