import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent {

}
