import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {LoaderComponent} from "./loader/loader.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [LoaderComponent, HttpClientModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  }
}
