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
* Le composant bet et le composant live ont eux aussi une logique d’initialisation
* commune : ils doivent tous deux charger une course à partir d’un paramètre de route raceId.
* Simplifions le code de ces deux composants en utilisant un resolver,
* appliqué aux deux routes, et résolvant race
*
* Deviens_un_Ninja_avec_Angular.pdf #_resolvers
* */

export class RaceResolver implements Resolve<RaceModel> {
  constructor(private raceService: RaceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<RaceModel> {
    const raceId = +route.paramMap.get('raceId');
    return this.raceService.get(raceId);
  }
}
