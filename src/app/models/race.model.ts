/*
enrichissez le fichier race.model.ts
pour que notre entité contienne également
un tableau de PonyModel
*/

import { PonyModel } from './pony.model';

export interface RaceModel {
  id: number; // un id de type number,
  name: string;
  ponies: Array<PonyModel>; // un tableau de PonyModel nommé ponies
  startInstant: string; // un champ startInstant de type string
}

