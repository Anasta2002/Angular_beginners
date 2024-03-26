import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderRegistrationComponent } from '../feature/order-registration/order-registration.component';

@Component({
  standalone: true,
  imports: [RouterModule, OrderRegistrationComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'self-management-terminal';
}
