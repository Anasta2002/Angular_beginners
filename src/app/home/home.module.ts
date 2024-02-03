import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { AddFormModule } from '../add-form/add-form.module';
import { ItemsModule } from '../items/items.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [FormsModule, AddFormModule, ItemsModule],
  exports: [HomeComponent],
  providers: [],
})
export class HomeModule {}
