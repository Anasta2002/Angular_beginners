import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { AddFormComponent } from './add-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddFormComponent],
  imports: [ReactiveFormsModule],
  providers: [],
  exports: [AddFormComponent],
})
export class AddFormModule {}
