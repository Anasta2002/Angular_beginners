import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { AddFormModule } from './add-form/add-form.module';
import { ItemsModule } from './items/items.module';
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {DropdownComponent} from "./dropdown/dropdown.component";

@NgModule({
  declarations: [HomeComponent, DropdownComponent],
  imports: [FormsModule,
    AddFormModule,
    ItemsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [HomeComponent, DropdownComponent],
})
export class HomeModule {}
