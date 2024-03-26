import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';


export type buttonType = 'submit' | 'link';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class ButtonComponent {
  @Input() label = '';
  @Input() isImage = false;
  @Input() id: number | undefined;
  @Output() buttonClicked = new EventEmitter<number>();

  onClick() {
    this.buttonClicked.emit(this.id);
  }
}
