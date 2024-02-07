import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnChanges {
  @Output() onLoaderClick: EventEmitter<void> = new EventEmitter();
  @Input() data: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      console.log(changes['data']);
    }
  }

  loadHandler() {
    this.onLoaderClick.emit();
  }

  changeComplete(todo: any) {
    todo.completed = !todo.completed;
  }

  deleteToDo(todo: any) {
    const index = this.data.indexOf(todo);
    index !== -1 && this.data.splice(index, 1);
  }
}
