import { Component, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Output() onLoaderClick: EventEmitter<void> = new EventEmitter();

  loadHandler() {
    this.onLoaderClick.emit();
  }
}
