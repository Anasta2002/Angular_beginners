import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuestionsComponent} from "./questions.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatPaginator} from "@angular/material/paginator";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {usersDropdownComponent} from "./usersDropdown/usersDropdown.component";

@NgModule({
  declarations: [QuestionsComponent, usersDropdownComponent],
  imports: [
    CommonModule,
    MatProgressSpinner,
    MatPaginator,
    MatFormField,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  providers: [],
  exports: [QuestionsComponent]
})
export class QuestionsModule { }
