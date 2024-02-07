import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationsComponent } from './notifications.component';
import { CommonModule } from '@angular/common';
import { NotificationLoaderComponent } from './notification-loader/notification-loader.component';

@NgModule({
  declarations: [NotificationsComponent, NotificationLoaderComponent],
  imports: [CommonModule, FormsModule],
  exports: [NotificationsComponent],
})
export class NotificationsModule {}
