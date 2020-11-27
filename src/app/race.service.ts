import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { LiveRaceModel, RaceModel} from './models/race.model';
import { environment } from '../environments/environment';
import { PonyWithPositionModel } from './models/pony.model';
import { map } from 'rxjs/operators';
import {WsService} from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private wsService: WsService) { }

  list(): Observable<Array<RaceModel>> {
    const params = { status: 'PENDING' };
    return this.http.get<Array<RaceModel>>(this.baseUrl + '/api/races', { params });
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.http.post<RaceModel>(this.baseUrl  + '/api/races/' + raceId + '/bets', {ponyId} );
  }

  get(id: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(this.baseUrl  + '/api/races/' + id);
  }

  cancelBet(raceId: number): Observable<RaceModel>{
    return this.http.delete<RaceModel>(this.baseUrl + '/api/races/' + raceId + '/bets');
  }

  /* utiliser ce nouveau service WsService depuis RaceService.
  Injectez WsService dans RaceService et modifiez le code de la méthode live
  afin qu’il se connecte réellement au channel /race/${raceId}
  pour obtenir les positions des poneys

   l’opérateur map pour transformer la notification
   reçue en un tableau de positions, dans la méthode live
  */
  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return this.wsService.connect<LiveRaceModel>('/race/' + raceId )
      .pipe(map(liveRace => liveRace.ponies));
  }
  /*
  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return interval(1000).pipe(
      take(101),
      map(position => {
        return [
          {
            id: 1,
            name: 'Superb Runner',
            color: 'BLUE',
            position
          },
          {
            id: 2,
            name: 'Awesome Fridge',
            color: 'GREEN',
            position
          },
          {
            id: 3,
            name: 'Great Bottle',
            color: 'ORANGE',
            position
          },
          {
            id: 4,
            name: 'Little Flower',
            color: 'YELLOW',
            position
          },
          {
            id: 5,
            name: 'Nice Rock',
            color: 'PURPLE',
            position
          }
        ];
      })
    );
  }
  */
}
