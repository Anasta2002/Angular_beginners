import { Route } from '@angular/router';
import { OrderRegistrationComponent } from '../feature/order-registration/order-registration.component';

export const appRoutes: Route[] = [
  {
    path: 'login',
    component: OrderRegistrationComponent,
  },
  {
    path: 'order-registration',
    component: OrderRegistrationComponent,
  }
];
