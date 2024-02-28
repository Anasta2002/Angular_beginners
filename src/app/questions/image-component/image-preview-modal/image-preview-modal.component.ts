import {ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output} from '@angular/core';

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

  // not working ((
  onModalClick(): void {
    this.closeModalWindow.emit();
  }
}
