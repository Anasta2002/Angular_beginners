import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsComponent implements OnChanges, OnInit {
  @Input() products: any[] = [];

  private _anotherInput: string = '';

  @Input()
  set anotherInput(value: string) {
    console.log(value);
    this._anotherInput = value;
  }
  get anotherInput(): string {
    return this._anotherInput;
  }

  // под коробкой
  // произошли изменения внутри
  // itemsComponent.ngOnChanges({ products: { currentValue: [], previousValue: [1], isFirstChange: () => false, ...}})

  // Самый первый раз
  // Изменения в любом из @Input
  ngOnChanges(changes: SimpleChanges): void {
    if ('products' in changes) {
      console.log(changes['products'].isFirstChange);
    }
    if ('anotherInput' in changes) {
      console.log(changes['anotherInput']);
    }
  }

  ngOnInit(): void {}

  deleteProduct(product: any) {
    console.log('1', this.products);
    const index = this.products.indexOf(product);

    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }
}
