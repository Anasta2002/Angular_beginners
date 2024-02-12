import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuestionsComponent} from "./questions.component";
import {PaginationService} from "../services/pagination.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatPaginator} from "@angular/material/paginator";



@NgModule({
  declarations: [QuestionsComponent],
    imports: [
        CommonModule,
        MatProgressSpinner,
        MatPaginator
    ],
  providers: [PaginationService],
  exports: [QuestionsComponent]
})
export class QuestionsModule { }
