import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { AddFormModule } from './add-form/add-form.module';
import { ItemsModule } from './items/items.module';
import {HomeService} from "../services/home.service";
import {ImagesComponent} from "./images/images.component";

@NgModule({
  declarations: [HomeComponent],
    imports: [FormsModule, AddFormModule, ItemsModule, ImagesComponent],
  exports: [HomeComponent],
  providers: [HomeService],
})
export class HomeModule {}
