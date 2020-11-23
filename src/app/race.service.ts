import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RaceModel } from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
// Transformons donc le service
// pour lui faire retourner un Observable.
// renvoyer la liste des courses, enveloppée dans un Observable avec la fonction of

  constructor() { }
  /*
  => à transformer en fonction observable
  list(): Array<RaceModel> {
    return [
      {name: 'Lyon'},
      {name: 'Los Angeles'},
      {name: 'Sydney'},
      {name: 'Tokyo'},
      {name: 'Casablanca'}
    ];
  }
  */
  list(): Observable<Array<RaceModel>> {
    return of([
      {name: 'Lyon'},
      {name: 'Los Angeles'},
      {name: 'Sydney'},
      {name: 'Tokyo'},
      {name: 'Casablanca'}
    ])
      .pipe(delay(500));
  }


}
