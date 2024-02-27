import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { AddFormModule } from './add-form/add-form.module';
import { ItemsModule } from './items/items.module';
import {HomeService} from "../services/home.service";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {DropdownComponent} from "./dropdown/dropdown.component";
import {ImageUploadComponent} from "./image-upload/image-upload.component";
import {AsyncPipe, NgForOf} from "@angular/common";

@NgModule({
  declarations: [HomeComponent, DropdownComponent, ImageUploadComponent],
  imports: [FormsModule,
    AddFormModule,
    ItemsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule, AsyncPipe, NgForOf,
  ],
  exports: [HomeComponent, DropdownComponent],
  providers: [HomeService],
})
export class HomeModule {}
