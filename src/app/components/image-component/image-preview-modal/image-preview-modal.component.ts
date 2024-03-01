import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  inject,
} from '@angular/core';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-preview-modal',
  templateUrl: './image-preview-modal.component.html',
  styleUrls: ['./image-preview-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ImageCropperModule],
})
export class ImagePreviewModalComponent {
  @Input() imageUrl: string | null = null;
  @Input() imageChangeEvent: Event | undefined;

  @Output() onCloseModal = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<SafeUrl>();

  cropImgPreview: SafeUrl | undefined;

  private elementRef = inject(ElementRef);
  private sanitizer = inject(DomSanitizer);

  @HostListener('document:click', ['$event'])
  clickOutside(event: { target: any }) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.onCloseModal.emit();
    }
  }

  closeClick(event: Event): void {
    event.stopPropagation();
    this.onCloseModal.emit();
  }

  submit(): void {
    this.onSubmit.emit(this.cropImgPreview);
  }

  cropImage(e: ImageCroppedEvent) {
    if (typeof e.objectUrl === 'string') {
      this.cropImgPreview = this.sanitizer.bypassSecurityTrustUrl(e.objectUrl);
    }
  }
}
