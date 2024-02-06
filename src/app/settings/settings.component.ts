import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LoaderComponent} from "./loader/loader.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    LoaderComponent
  ]
})
export class SettingsComponent {
  private http = inject(HttpClient);
  private cd = inject(ChangeDetectorRef);

  data: any = {};

  handlerClick() {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos')
      .subscribe((data) => {
        this.data = data;
        this.cd.markForCheck();
      });
    console.log('data_settings', this.data)
  }
}
