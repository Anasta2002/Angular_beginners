import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';

import { CloseIconComponent } from '../icons/close';
import { CropIconComponent } from '../icons/crop';
import { DeleteIconComponent } from '../icons/delete';
import { PlusIconComponent } from '../icons/plus';
import { SaveIconComponent } from '../icons/save';
import { UploadIconComponent } from '../icons/upload';
import { NotificationComponent } from '../../components/notification/notification.component';

@Component({
  selector: 'ogs-image-upload',
  standalone: true,
  imports: [NgIf, AsyncPipe, ImageCropperModule, UploadIconComponent, DeleteIconComponent, DeleteIconComponent, DeleteIconComponent, CropIconComponent, MatButtonModule, MatProgressSpinnerModule, PlusIconComponent, CloseIconComponent, SaveIconComponent, NotificationComponent],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
  imageUrl: string | null = null;
  imageChangeEvent: Event | undefined;
  errorMessage: boolean = false;
  croppedImage: SafeUrl | undefined;
  isUploadDisabled: boolean = false;
  isCropperActive: boolean = false;
  notificationText: string = "Das Foto wurde erfolgreich hochgeladen";
  showNotification: boolean = false;

  private sanitizer = inject(DomSanitizer);

  @ViewChild('imageUploadInput') private imageUploadInput: ElementRef<HTMLInputElement> | undefined;

  get showImage(): boolean {
    return this.imageUrl !== null;
  }

  submitCrop(url: SafeUrl | undefined): void {
    if (url) {
      this.imageUrl = url as string;
    }
    this.isUploadDisabled = false;
    this.isCropperActive = false;
    this.showNotification = true;
  }

  onFileChange(event: Event): void {
    this.isCropperActive = true;
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const fileType = file.type;

      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        this.imageChangeEvent = event;
      } else {
        this.errorMessage = true;
      }
    }
    console.log('onFileChange', this.isCropperActive)
  }

  onFileClick(event: Event): void {
    (event.target as HTMLInputElement).value = '';
  }

  openUpload(): void {
    if (this.imageUploadInput) {
      this.imageUploadInput.nativeElement.click();
    }
  }

  cancelCropping() {
    this.isCropperActive = false;
  }

  delete(): void {
    this.imageUrl = null;
  }

  cropImage(e?: ImageCroppedEvent): void {
    this.isCropperActive = true;
    this.isUploadDisabled = true;
    if (e && typeof e.objectUrl === 'string') {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(e.objectUrl);
    }
  }

  openCropper(): void {
    if (this.imageUrl) {
      this.isCropperActive = true;
      this.croppedImage = undefined;

      setTimeout(() => {
        this.cropImage({ objectUrl: this.imageUrl } as ImageCroppedEvent);
      });
    }
  }

  closeNotification(): void {
    this.showNotification = false;
  }
}
