import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationsComponent } from './notifications.component';
import { CommonModule } from '@angular/common';
import { NotificationLoaderComponent } from './notification-loader/notification-loader.component';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@NgModule({
  declarations: [NotificationsComponent, NotificationLoaderComponent],
  imports: [CommonModule, FormsModule, MatIconModule, MatIcon, MatIconButton],
  exports: [NotificationsComponent],
})
export class NotificationsModule {}
