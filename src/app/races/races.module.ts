import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinishedRacesComponent } from './finished-races/finished-races.component';
import { PendingRacesComponent } from './pending-races/pending-races.component';
import { LiveComponent } from '../live/live.component';
import { BetComponent } from '../bet/bet.component';
import { FromNowPipe } from '../from-now.pipe';
import { PonyComponent } from '../pony/pony.component';
import { RaceComponent } from '../race/race.component';
import { RacesComponent } from './races.component';
import { RouterModule } from '@angular/router';
import { RACES_ROUTES } from './races.routes';
import {SharedModule} from '../shared/shared/shared.module';

/*
* * Pour cela, il faut ajouter AlertComponent à l’attribut exports du décorateur
* du SharedModule, et importer le SharedModule dans RacesModule.
* */

@NgModule({
  declarations: [
    RacesComponent,
    RaceComponent,
    PonyComponent,
    FromNowPipe,
    BetComponent,
    LiveComponent,
    PendingRacesComponent,
    FinishedRacesComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(RACES_ROUTES),
    SharedModule
  ]
})
export class RacesModule {}
