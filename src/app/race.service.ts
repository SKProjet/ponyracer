import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { RaceModel } from './models/race.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RaceService {

  private apiUrl = environment.apiUrl + 'races';

  constructor(private http: HttpClient) { }

  list(): Observable<Array<RaceModel>> {
    const params = { status: 'PENDING' };
    return this.http.get<Array<RaceModel>>(this.apiUrl, { params });
  }

}
