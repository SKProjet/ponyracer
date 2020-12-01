import { Routes } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import {MoneyHistoryComponent} from './money-history/money-history.component';

export const USERS_ROUTES: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'money/history', component: MoneyHistoryComponent }
  /* Ajoutez la configuration nécessaire à users.routes.ts,
  pour que nous puissions naviguer vers ce composant avec le chemin /users/money/history. */
];


