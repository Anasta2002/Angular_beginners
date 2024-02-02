import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {SettingsComponent} from "./settings/settings.component";
import {NotificationsComponent} from "./notifications/notifications.component";
import {QuestionsComponent} from "./questions/questions.component";
import {NotFoundComponent} from "./not-found/not-found.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: '**', component: NotFoundComponent },
];
