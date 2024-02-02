import {NgModule} from "@angular/core";
import {ItemsComponent} from "./items.component";
import {NgForOf} from "@angular/common";

@NgModule({
  declarations: [ItemsComponent],
  imports: [
    NgForOf
  ],
  providers: [],
  exports: [
    ItemsComponent
  ],
})

export class ItemsModule {};
