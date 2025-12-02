import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Screener } from './components/screener/screener';
import { Documentation } from './components/documentation/documentation';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'screener', component: Screener },
  { path: 'documentation', component: Documentation },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];
