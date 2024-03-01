import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ImagePreviewModalComponent } from './image-preview-modal/image-preview-modal.component';

@Component({
  selector: 'app-image-component',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, ImagePreviewModalComponent],
})
export class ImageUploadComponent {
  imageUrl: string | null = null;
  showPreviewWindow: boolean = false;
  imageChangeEvent: Event | undefined;

  @ViewChild('imageUploadInput') private imageUploadInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  get showImage(): boolean {
    return this.imageUrl !== null;
  }

  submitCrop(url: SafeUrl | undefined): void {
    if (url) {
      this.imageUrl = url as string;
      this.showCropModal(false);
    }
  }

  onFileChange(e: Event): void {
    this.imageChangeEvent = e;

    this.showPreviewWindow = true;
  }

  onFileClick(event: Event): void {
    (event.target as HTMLInputElement).value = '';
  }

  openUpload(): void {
    if (this.imageUploadInput) {
      this.imageUploadInput.nativeElement.click();
    }
  }

  delete(): void {
    this.imageUrl = null;
  }

  closeModal(): void {
    this.showCropModal(false);
  }

  private showCropModal(show: boolean): void {
    this.showPreviewWindow = show;
  }
}
