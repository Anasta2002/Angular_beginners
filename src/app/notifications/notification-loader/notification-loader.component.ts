import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification-loader',
  templateUrl: './notification-loader.component.html',
  styleUrls: ['./notification-loader.component.css'],
})
export class NotificationLoaderComponent {
  @Output() handlerClick: EventEmitter<void> = new EventEmitter();
  @Input() products: any;

  currentIndexMap: { [productId: number]: number } = {};

  nextSlide(product: any) {
    this.currentIndexMap[product.id] = (this.currentIndexMap[product.id] + 1) % product.images.length;
    console.log('currentIndexMap_next', this.currentIndexMap[product.id] )
  }

  prevSlide(product: any) {
    console.log('currentIndexMap_prev', this.currentIndexMap[product.id] )
    this.currentIndexMap[product.id] = (this.currentIndexMap[product.id] - 1 + product.images.length) % product.images.length;
  }

  toggleAccordion(product: any) {
    product.isOpen = !product.isOpen;
  }

  loadHandler() {
    this.handlerClick.emit();
  }

  currentIndex = 0;
}
