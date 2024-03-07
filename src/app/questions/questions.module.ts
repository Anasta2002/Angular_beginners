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
import {MatIcon} from "@angular/material/icon";
import {MatProgressBar} from "@angular/material/progress-bar";
import {ImageUploadComponent} from "./image-component/image-upload.component";
import {ImagePreviewModalComponent} from "./image-component/image-preview-modal/image-preview-modal.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ImageCropperModule} from "ngx-image-cropper";

@NgModule({
  declarations: [QuestionsComponent, UserCardComponent, UsersDropdownComponent ],
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
    MatIcon,
    MatProgressBar,
    MatDialogModule,
    ImageCropperModule,
    ImagePreviewModalComponent,
    ImageUploadComponent,
  ],
  exports: [QuestionsComponent],
})
export class QuestionsModule {}
