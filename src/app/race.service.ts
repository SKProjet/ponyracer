import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
/*
* Ce service devra avoir une méthode nommée list() qui renverra la liste de 2 courses que nous avions définie précédemment.
* */
  constructor() { }

  list(): Array<RaceModel> {
    return [
            { name: 'Lyon' },
            { name: 'London' }
           ];
  }
}
