import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification-loader',
  templateUrl: './notification-loader.component.html',
  styleUrls: ['./notification-loader.component.css'],
})
export class NotificationLoaderComponent {
  @Input() products: any;

  currentIndexMap: { [productId: number]: number } = {};

  nextSlide(product: any) {
    if (!this.currentIndexMap[product.id]) {
      this.currentIndexMap[product.id] = 0;
    }
    this.currentIndexMap[product.id] = (this.currentIndexMap[product.id] + 1) % product.images.length;
    console.log('currentIndexMap_next', this.currentIndexMap[product.id]);
  }

  prevSlide(product: any) {
    if (!this.currentIndexMap[product.id]) {
      this.currentIndexMap[product.id] = 0;
    }
    console.log('currentIndexMap_prev', this.currentIndexMap[product.id]);
    this.currentIndexMap[product.id] = (this.currentIndexMap[product.id] - 1 + product.images.length) % product.images.length;
  }

  toggleAccordion(product: any) {
    if (!product.id) {
      product.id = Math.floor(Math.random() * 1000);
    }
    product.isOpen = !product.isOpen;
  }
}
