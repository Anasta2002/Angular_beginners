import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import {
  MatOption,
  MatSelect,
  MatSelectModule,
} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {UserCardComponent} from "./usersDropdown/user-card/user-card.component";
import {UsersDropdownComponent} from "./usersDropdown/users-dropdown.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [QuestionsComponent, UserCardComponent, UsersDropdownComponent],
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
    MatAutocomplete,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    HttpClientModule,
    MatSelectModule,
  ],
  exports: [QuestionsComponent],
})
export class QuestionsModule {}
