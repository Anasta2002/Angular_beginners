import {ItemsComponent} from "./items.component";
import {NgForOf} from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [ItemsComponent],
  imports: [
    NgForOf
  ],
  providers: [],
  exports: [
    ItemsComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
})

export class ItemsModule {}

