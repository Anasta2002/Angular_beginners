import { ItemsComponent } from './items.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ItemsComponent],
  imports: [CommonModule],
  providers: [],
  exports: [ItemsComponent],
})
export class ItemsModule {}
