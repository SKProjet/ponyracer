import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {RaceModel} from './models/race.model';
import {RaceService} from './race.service';

@Injectable({
  providedIn: 'root'
})

/*
* Ce service doit implémenter l’interface Resolve<Array<RaceModel>> et sa méthode resolve,
* en utilisant la propriété routeConfig.path de la route activée ('pending' ou 'finished'),
* afin de charger les courses ayant l’état correspondant ('PENDING' ou 'FINISHED').
*
* Deviens_un_Ninja_avec_Angular.pdf #_resolvers
* */

export class RacesResolver implements Resolve<Array<RaceModel>> {
  constructor(private raceService: RaceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Array<RaceModel>> {
    const status = route.routeConfig.path.toUpperCase() as 'PENDING' | 'RUNNING' | 'FINISHED';
    return this.raceService.list(status);
  }
}
