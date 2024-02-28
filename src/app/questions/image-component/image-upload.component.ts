import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ImagePreviewModalComponent } from './image-preview-modal/image-preview-modal.component';

@Component({
  selector: 'app-image-component',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  file: File | null = null;
  imageUrl: string | ArrayBuffer | null | undefined = null;
  previewWindow: boolean = false;

  imageForm: FormGroup;

  @ViewChild('imgInput') imgInput: ElementRef | undefined;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.imageForm = this.fb.group({
      img: [''],
    });
  }

  openPreviewModal(): void {
    if (this.imageUrl) {
      const dialogRef = this.dialog.open(ImagePreviewModalComponent, {
        data: { imageUrl: this.imageUrl },
      });
    }
  }

  ngAfterViewInit(): void {
    this.updateImage();
  }

  onChange(event: any): void {
    const file: File = event.target.files[0];
    this.previewWindow = true;

    if (file) {
      this.status = 'initial';
      this.file = file;

      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
        this.updateImage();
      };

      reader.readAsDataURL(file);
    }
  }


  private updateImage(): void {
    if (this.imgInput) {
      this.imgInput.nativeElement.src = this.imageUrl || '';
    }
  }

  onUploadAnother(): void {
    this.status = 'initial';
    this.file = null;
    this.imageUrl = null;
  }

  onDelete(): void {
    this.status = 'initial';
    this.file = null;
    this.imageUrl = null;
    this.imageForm.reset();
  }

  closeModalWindow() {
    this.previewWindow = false;
  }
}
