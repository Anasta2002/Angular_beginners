import { ItemsComponent } from './items.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {CartService} from "../../services/cart.service";

@NgModule({
  declarations: [ItemsComponent],
  imports: [CommonModule],
  providers: [CartService],
  exports: [ItemsComponent],
})
export class ItemsModule {}
