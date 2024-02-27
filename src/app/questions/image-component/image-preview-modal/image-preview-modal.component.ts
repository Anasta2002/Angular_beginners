import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-image-preview-modal',
  templateUrl: './image-preview-modal.component.html',
  styleUrls: ['./image-preview-modal.component.css'],
})

export class ImagePreviewModalComponent {
  @Input() imageUrl: string | ArrayBuffer | null | undefined = null;
  @Output() closeModalWindow = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  onCloseClick(event: Event): void {
    event.stopPropagation();
    this.closeModalWindow.emit();
  }

  onModalClick(): void {
    this.closeModalWindow.emit();
  }

  setImageUrl(imageUrl: string): void {
    this.imageUrl = imageUrl;
    this.cdr.detectChanges();
  }
}
