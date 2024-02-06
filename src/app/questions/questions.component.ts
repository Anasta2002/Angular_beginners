import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionsComponent {

}
