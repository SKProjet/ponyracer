import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RacesComponent } from './races/races.component';

// Deviens_un_Ninja_avec_Angular.pdf #router

export const ROUTES: Routes = [

  { path: '', component: HomeComponent },
  { path: 'races', component: RacesComponent }
];


