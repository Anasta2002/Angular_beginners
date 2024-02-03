import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HomeModule } from './home/home.module';

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes), HomeModule],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
