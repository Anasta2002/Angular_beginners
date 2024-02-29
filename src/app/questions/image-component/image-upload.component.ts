import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-component',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploadComponent {
  file: File | null = null;
  imageUrl: string | ArrayBuffer | null | undefined = null;
  previewWindow: boolean = false;
  imageChangeEvent: Event | undefined;

  @ViewChild('imageUploadInput') private imageUploadInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  get showImage(): boolean {
    return this.imageUrl !== null;
  }

  imageClick(): void {
    this.showCropModal(!!this.imageUrl);
  }

  submitCrop(url: SafeUrl | undefined): void {
    if (url) {
      this.imageUrl = url as string;
      this.showCropModal(false);
    }
  }

  onFileChange(e: Event): void {
    this.imageChangeEvent = e;

    this.previewWindow = true;
  }

  onFileClick(event: any): void {
    event.target.value = '';
  }

  openUpload() {
    if (this.imageUploadInput) {
      this.imageUploadInput.nativeElement.click();
    }
  }

  onDelete(): void {
    this.file = null;
    this.imageUrl = null;
  }

  closeModalWindow() {
    this.showCropModal(false);
  }

  showCropModal(show: boolean): void {
    this.previewWindow = show;
  }
}
