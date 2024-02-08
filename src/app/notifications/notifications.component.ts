import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject, OnInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsComponent implements OnInit {
  private http = inject(HttpClient);
  private cd = inject(ChangeDetectorRef);

  products: any[] | undefined;

  ngOnInit() {
    this.handlerClick();
  }

  handlerClick() {
    this.http.get<any>('https://dummyjson.com/products').subscribe((data) => {
      this.products = data.products;
      console.log(this.products);
      this.cd.markForCheck();
    });
  }
}
