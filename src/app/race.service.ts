import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { RaceModel } from './models/race.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RaceService {

// API REST que nous avons mise en place et qui est disponible à l’adresse https://ponyracer.ninja-squad.com.
// Utilisez donc le service HttpClient dans votre RaceService pour récupérer la liste des courses en attente !
// Astuce : le méthode get accepte des options en deuxième paramètre. Vous pouvez utiliser ces options
// pour ajouter des paramètres de recherche à l’URL avec { params:{ hello: 'world' } }.
  private apiUrl = environment.apiUrl + 'races';

  constructor(private http: HttpClient) { }

  list(): Observable<Array<RaceModel>> {
      // GET /api/races?status=PENDING HTTP/1.1
      // Host: ponyracer.ninja-squad.com

    const params = { status: 'PENDING' };
    return this.http.get<Array<RaceModel>>(this.apiUrl, { params });
  }

/*
  list(): Observable<Array<RaceModel>> {
    return of([
      {
        id: 12,
        name: 'Paris',
        ponies: [
          { id: 1, name: 'Gentle Pie', color: 'YELLOW' },
          { id: 2, name: 'Big Soda', color: 'ORANGE' },
          { id: 3, name: 'Gentle Bottle', color: 'PURPLE' },
          { id: 4, name: 'Superb Whiskey', color: 'GREEN' },
          { id: 5, name: 'Fast Rainbow', color: 'BLUE' }
        ],
        startInstant: '2020-02-18T08:02:00Z'
      }, {
        id: 13,
        name: 'Tokyo',
        ponies: [
          { id: 6, name: 'Fast Rainbow', color: 'BLUE' },
          { id: 7, name: 'Gentle Castle', color: 'GREEN' },
          { id: 8, name: 'Awesome Rock', color: 'PURPLE' },
          { id: 9, name: 'Little Rainbow', color: 'YELLOW' },
          { id: 10, name: 'Great Soda', color: 'ORANGE' }
        ],
        startInstant: '2020-02-18T08:03:00Z'
      }
    ])
      .pipe(delay(500));
  }
*/

}
