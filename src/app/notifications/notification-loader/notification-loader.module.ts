import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationLoaderComponent} from "./notification-loader.component";



@NgModule({
  declarations: [NotificationLoaderComponent],
  imports: [
    CommonModule
  ],
  exports: [NotificationLoaderComponent]
})
export class NotificationLoaderModule { }
