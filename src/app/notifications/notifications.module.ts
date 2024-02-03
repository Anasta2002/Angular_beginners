import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import {NotificationsComponent} from "./notifications.component";

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    RouterModule.forRoot([]),
    FormsModule,
],
  exports: [NotificationsComponent]
})

export class NotificationsModule {}
