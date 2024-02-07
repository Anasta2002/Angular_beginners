import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SettingsComponent } from './settings.component';
import { LoaderComponent } from './loader/loader.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SettingsComponent, LoaderComponent],
  imports: [CommonModule, HttpClientModule, MatIconModule],
  exports: [SettingsComponent],
})
export class SettingsModule {}
