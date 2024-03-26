import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: "app-login-view",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginComponent {}