import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {NotificationsComponent} from "./notifications.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {NotificationLoaderModule} from "./notification-loader/notification-loader.module";

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    RouterModule.forRoot([]),
    FormsModule,
    NgForOf,
    AsyncPipe,
    NotificationLoaderModule,
  ],
  exports: [NotificationsComponent]
})

export class NotificationsModule {}
