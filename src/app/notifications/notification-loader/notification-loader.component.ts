import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-notification-loader',
  templateUrl: './notification-loader.component.html',
  styleUrl: './notification-loader.component.css'
})
export class NotificationLoaderComponent {
  @Output() handlerClick: EventEmitter<void> = new EventEmitter()
  @Input() products: any;


  loadHandler() {
    this.handlerClick.emit();
  }
}
