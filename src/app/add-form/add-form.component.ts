import {
  Component,
  EventEmitter,
  Output,
  Inject,
  ChangeDetectionStrategy,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

interface User {
  name: string;
  age: number;
}

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent implements OnInit, OnDestroy {
  @Output() newProductEvent = new EventEmitter<{
    id: string;
    name: string;
    price: number;
  }>();
  addForm: FormGroup;

  userForm: FormGroup<{
    name: FormControl<string>;
    age: FormControl<number>;
  }> | null = null;

  @Input() user: User | undefined;

  constructor() {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl<string>(this.user ? this.user.name : 'not-found'),
      age: new FormControl<number>(this.user ? this.user.age : 99),
    });
  }

  ngOnDestroy(): void {}

  addNewProduct() {
    const productNameControl = this.addForm.get('productName');
    const productPriceControl = this.addForm.get('productPrice');

    if (
      productNameControl &&
      productPriceControl &&
      productNameControl.value !== null &&
      productPriceControl.value !== null
    ) {
      const newProduct = {
        id: new Date().toString(),
        name: productNameControl.value,
        price: productPriceControl.value,
      };

      this.newProductEvent.emit(newProduct);
      this.addForm.reset();
    }
  }
}
