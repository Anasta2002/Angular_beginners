import { NgModule } from '@angular/core';
import { AddFormComponent } from './add-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddFormComponent],
  imports: [ReactiveFormsModule],
  exports: [AddFormComponent],
})
export class AddFormModule {}
