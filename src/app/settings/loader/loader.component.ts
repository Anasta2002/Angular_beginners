import { JsonPipe } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  @Output() onLoaderClick: EventEmitter<void> = new EventEmitter();
  @Input() data: any;

  loadHandler() {
    this.onLoaderClick.emit();
  }
}
