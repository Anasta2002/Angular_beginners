import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { AddFormModule } from './add-form/add-form.module';
import { ItemsModule } from './items/items.module';
import {HomeService} from "../services/home.service";
import {CartService} from "../services/cart.service";

@NgModule({
  declarations: [HomeComponent],
  imports: [FormsModule, AddFormModule, ItemsModule],
  exports: [HomeComponent],
  providers: [HomeService, CartService],
})
export class HomeModule {}
