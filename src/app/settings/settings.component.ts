import {ChangeDetectionStrategy, Component, Output} from '@angular/core';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {

  handlerClick() {
    console.log('click')
  }
}
