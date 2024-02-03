import { NgModule } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddFormModule } from './add-form/add-form.module';
import { ItemsModule } from './items/items.module';
import { MenuModule } from './menu/menu.module';
import { ThemeService } from './services/theme.service';
import { routes } from './app.routes';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    AppRoutingModule,
    FormsModule,
    AddFormModule,
    ItemsModule,
    MenuModule,
    BrowserModule,
  ],
  declarations: [AppComponent],
  exports: [],
  providers: [ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
