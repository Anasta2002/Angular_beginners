import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [JsonPipe, NgForOf, MatIcon, NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  @Output() onLoaderClick: EventEmitter<void> = new EventEmitter();
  @Input() data: any;

  loadHandler() {
    this.onLoaderClick.emit();
    console.log('data', this.data)
  }

  changeComplete(todo: any) {
    todo.completed = !todo.completed;
  }
}
