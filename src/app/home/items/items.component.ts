import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsComponent {
  @Input() products: any[] = [];

  deleteProduct(product: any) {
    const index = this.products.indexOf(product);

    if (index !== -1) {
      this.products = [...this.products.slice(0, index), ...this.products.slice(index + 1)];
    }
  }
}
