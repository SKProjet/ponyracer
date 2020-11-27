import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { RaceModel } from './models/race.model';
import { environment } from '../environments/environment';


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
  /* https://ponyracer.ninja-squad.com/apidoc#resources-bet-create
  méthode bet(raceId: number, ponyId: number) dans le service RaceService
   */
  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.http.post<RaceModel>(this.baseUrl  + '/api/races/' + raceId + '/bets', {ponyId} );
  }
  /* Créez aussi une méthode get(id: number) qui permet de récupérer une course par son id */
  get(id: number): Observable<RaceModel> {
    return this.http.get<RaceModel>(this.baseUrl  + '/api/races/' + id);
  }

}
