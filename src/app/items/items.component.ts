import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsComponent {
  @Input() products: any[] = [];

  deleteProduct(product: any) {
    console.log('1', this.products);
    const index = this.products.indexOf(product);

    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }
}
