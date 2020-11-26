import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { RaceModel } from './models/race.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RaceService {

  // suite à la modif de l'environnement.ts changement pour baseURL
  // private apiUrl = environment.apiUrl + 'races';
  private baseUrl = environment.baseUrl + 'api/races';

  constructor(private http: HttpClient) { }

  list(): Observable<Array<RaceModel>> {
    const params = { status: 'PENDING' };
    return this.http.get<Array<RaceModel>>(this.baseUrl, { params });
  }

}
