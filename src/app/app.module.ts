import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddFormModule } from './home/add-form/add-form.module';
import { MenuModule } from './menu/menu.module';
import { ThemeService } from './services/theme.service';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ItemsModule} from "./home/items/items.module";

@NgModule({
  imports: [
    AppRoutingModule,
    FormsModule,
    AddFormModule,
    // ItemsModule,
    MenuModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent],
  exports: [],
  providers: [ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
