import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable} from 'rxjs';
import { RaceModel } from './models/race.model';
import { environment } from '../environments/environment';
import { PonyWithPositionModel } from './models/pony.model';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

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

  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return interval(200).pipe(
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

}
