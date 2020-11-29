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

  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return this.wsService.connect<LiveRaceModel>('/race/' + raceId)
      .pipe(takeWhile(liveRace => liveRace.status !== 'FINISHED'),
        map(liveRace => liveRace.ponies)
      );
  }

  /*
  * https://ponyracer.ninja-squad.com/apidoc#resources-boost
  * Ajoutons maintenant une méthode boost au RaceService.
  * Cette méthode reçoit un raceId et un ponyId en arguments
  * */

  boost(raceId: number, ponyId: number): Observable<void> {
    // @ts-ignore
    return this.http.post<void>(this.baseUrl + '/api/races/' + raceId + '/boosts' , {ponyId});
  }
}
