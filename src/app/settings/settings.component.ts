import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Output,
  inject,
} from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [LoaderComponent, HttpClientModule],
  // providers: [HttpClientModule],
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
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((data) => {
        this.data = data;
        this.cd.markForCheck();
      });
  }
}
