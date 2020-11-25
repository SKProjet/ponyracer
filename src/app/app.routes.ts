import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent} from './register/register.component';
import { RacesComponent } from './races/races.component';

export const ROUTES: Routes = [

  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'races', component: RacesComponent }
];


