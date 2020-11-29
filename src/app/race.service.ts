import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { LiveRaceModel, RaceModel} from './models/race.model';
import { environment } from '../environments/environment';
import { PonyWithPositionModel } from './models/pony.model';
import {map, takeWhile} from 'rxjs/operators';
import {WsService} from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private wsService: WsService) {
  }

  list(): Observable<Array<RaceModel>> {
    const params = {status: 'PENDING'};
    return this.http.get<Array<RaceModel>>(this.baseUrl + '/api/races', {params});
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.http.post<RaceModel>(this.baseUrl + '/api/races/' + raceId + '/bets', {ponyId});
  }

  get(id: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(this.baseUrl + '/api/races/' + id);
  }

  cancelBet(raceId: number): Observable<RaceModel> {
    return this.http.delete<RaceModel>(this.baseUrl + '/api/races/' + raceId + '/bets');
  }

  /* nous souscrivons à l’Observable retourné par la méthode live
  Nous voulons émettre des événements jusqu’à ce que la course se termine,
  i.e. tant que l’état de la course n’est pas 'FINISHED'.
  Vous pouvez utiliser l’opérateur takeWhile
takeWhile émet les événements tant que le prédicat retourne true,
et termine l’émission dès qu’il retourne false.
N’oubliez pas d’importer ce nouvel opérateur.
   */

  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return this.wsService.connect<LiveRaceModel>('/race/' + raceId)
      // .pipe(map(liveRace => liveRace.ponies));
      .pipe(takeWhile(liveRace => liveRace.status !== 'FINISHED'),
        map(liveRace => liveRace.ponies)
      );
  }
}
