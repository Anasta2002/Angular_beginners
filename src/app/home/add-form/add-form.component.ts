import {Component, EventEmitter, Output, Inject, ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFormComponent {
  @Output() newProductEvent = new EventEmitter<{ id: string, name: string, price: number }>();
  addForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addForm = this.fb.group({
      productName: ['', Validators.required],
      productPrice: [0, [Validators.required, Validators.min(0)]],
    });
  }

  addNewProduct() {
    const productNameControl = this.addForm.get('productName');
    const productPriceControl = this.addForm.get('productPrice');

    if (productNameControl && productPriceControl && productNameControl.value !== null && productPriceControl.value !== null) {
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
