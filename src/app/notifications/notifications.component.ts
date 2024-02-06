import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NotificationsComponent {
  private http = inject(HttpClient);
  private cd = inject(ChangeDetectorRef);

  data: any = {};
  products: any[] | undefined;

  handlerClick() {
    this.http
      .get('https://dummyjson.com/products')
      .subscribe((data) => {
        this.data = data
        this.products = this.data.products;
        this.cd.markForCheck();
      });
    console.log('data_settings', this.products)
  }
}
