import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../../models';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() user: User | undefined;
}
