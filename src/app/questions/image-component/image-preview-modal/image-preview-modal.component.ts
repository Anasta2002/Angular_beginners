import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-image-preview-modal',
  templateUrl: './image-preview-modal.component.html',
  styleUrls: ['./image-preview-modal.component.css'],
})

export class ImagePreviewModalComponent {
  @Input() imageUrl: string | ArrayBuffer | null | undefined = null;
  @Output() closeModalWindow = new EventEmitter<void>();
  @Input() imageChangeEvent!: any;



  // constructor(private cdr: ChangeDetectorRef,  private sanitizer: DomSanitizer) {}
  constructor(private cdr: ChangeDetectorRef) {}

  onCloseClick(event: Event): void {
    event.stopPropagation();
    this.closeModalWindow.emit();
  }



  onModalClick(): void {
    this.closeModalWindow.emit();
  }
}
