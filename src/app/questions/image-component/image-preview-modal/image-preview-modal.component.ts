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
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-preview-modal',
  templateUrl: './image-preview-modal.component.html',
  styleUrls: ['./image-preview-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagePreviewModalComponent {
  @Input() imageUrl: string | ArrayBuffer | null | undefined = null;
  @Output() closeModalWindow = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<SafeUrl>();
  @Input() imageChangeEvent!: any;
  cropImgPreview: SafeUrl | undefined;

  private eRef = inject(ElementRef);
  private sanitizer = inject(DomSanitizer);

  @HostListener('document:click', ['$event'])
  clickOutside(event: { target: any }) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.closeModalWindow.emit();
    }
  }

  onCloseClick(event: Event): void {
    event.stopPropagation();
    this.closeModalWindow.emit();
  }

  submit(): void {
    this.onSubmit.emit(this.cropImgPreview);
  }

  cropImg(e: ImageCroppedEvent) {
    if (e.objectUrl != null) {
      this.cropImgPreview = this.sanitizer.bypassSecurityTrustUrl(e.objectUrl);
    }
  }
}
