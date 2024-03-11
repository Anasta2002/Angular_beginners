import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';

import { CloseIconComponent } from '../icons/close';
import { CropIconComponent } from '../icons/crop';
import { DeleteIconComponent } from '../icons/delete';
import { PlusIconComponent } from '../icons/plus';
import { SaveIconComponent } from '../icons/save';
import { UploadIconComponent } from '../icons/upload';
import { NotificationComponent } from '../../components/notification/notification.component';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'image-upload',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ImageCropperModule,
    UploadIconComponent,
    DeleteIconComponent,
    DeleteIconComponent,
    DeleteIconComponent,
    CropIconComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
    PlusIconComponent,
    CloseIconComponent,
    SaveIconComponent,
    NotificationComponent,
    NgClass,
  ],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
  imageUrl: string | null = null;
  hasBeenCropped: boolean = false;

  errorMessage: boolean = false;
  croppedImage: SafeUrl | undefined;
  isUploadDisabled: boolean = false;
  isCropperActive: boolean = false;
  notificationText: string = 'Das Foto wurde erfolgreich hochgeladen';
  showNotification: boolean = false;

  loader$: Subject<boolean> = new Subject();

  dragover: boolean = false;

  constructor() {
    this.loader$.subscribe((loader) => {
      console.log('LOADER -> ', loader);
    });
  }

  @ViewChild('imageUploadInput') private imageUploadInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  get showImage(): boolean {
    return this.imageUrl !== null;
  }

  onDragover(): void {
    this.dragover = true;
  }

  onDragleave(): void {
    this.dragover = false;
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
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const fileType = file.type;
      this.loader$.next(true);

      if (fileType === 'image/png' || fileType === 'image/jpeg') {
        this.imageUrl = URL.createObjectURL(file);
      } else {
        this.errorMessage = true;
      }
    }
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
      this.croppedImage = e.objectUrl;
      this.hasBeenCropped = true;
    }
  }

  openCropper(): void {
    this.isCropperActive = true;
  }

  closeNotification(): void {
    this.showNotification = false;
  }

  cropperReady(arg: any): void {
    this.loader$.next(false);
  }
}
