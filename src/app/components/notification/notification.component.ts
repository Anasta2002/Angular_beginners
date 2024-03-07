import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ogs-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  @Input() text: string = ''

  @Output() closeNotification = new EventEmitter<void>;

  triggerCloseModal() {
    this.closeNotification.emit();
  }
}
