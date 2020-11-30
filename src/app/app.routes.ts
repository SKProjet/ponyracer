import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent} from './register/register.component';
import { RacesComponent } from './races/races.component';
import { LoginComponent } from './login/login.component';
import { BetComponent } from './bet/bet.component';
import { LiveComponent } from './live/live.component';
import { LoggedInGuard } from './logged-in.guard';
import {RacesResolver} from './races.resolver';
import {PendingRacesComponent} from './races/pending-races/pending-races.component';
import {FinishedRacesComponent} from './races/finished-races/finished-races.component';
import {RaceResolver} from './race.resolver';

export const ROUTES: Routes = [

  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  /*
   * utiliser la directive router-outlet pour afficher le contenu associé à l’onglet actif.
    En ce qui concerne les routes :
    /races doit rediriger vers /races/pending ;
    /races/pending doit afficher les courses en attente (et rendre le premier onglet, Pending races, actif) ;
    /races/finished doit afficher les courses terminées (et rendre le deuxième onglet, Finished races, actif).
    *
    * Deviens_un_Ninja_avec_Angular.pdf 18.5. Routes hiérarchiques / #_resolvers
    *
   * */
  { path: 'races', canActivate: [LoggedInGuard],
    children: [
      { path: '', component: RacesComponent,
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'pending' },
          { path: 'pending', component: PendingRacesComponent,
            resolve: { races: RacesResolver } },
          { path: 'finished', component: FinishedRacesComponent,
            resolve: { races: RacesResolver } }
        ]
      },
        { path: '', component: RacesComponent },
        { path: ':raceId', component: BetComponent,
          resolve: { race: RaceResolver } },
        { path: ':raceId/live', component: LiveComponent,
          resolve: { race: RaceResolver } }
      ]
    }
];


