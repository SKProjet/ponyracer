import { PonyModel, PonyWithPositionModel } from './pony.model';

export interface RaceModel {
  id: number;
  name: string;
  ponies: Array<PonyModel>;
  startInstant: string;
  betPonyId?: number;
  /*Ajoutons une propriété optionnelle status? dans notre RaceModel,
  et une propriété status obligatoire dans notre LiveRaceModel.
  Ce champ est une enum côté serveur, avec 3 valeurs possibles :
    'PENDING' si la course n’a pas encore démarré ;
    'RUNNING' si la course est en train de se dérouler ;
    'FINISHED' si elle est déjà terminée. */
  status?: 'PENDING' | 'RUNNING' | 'FINISHED';
}

export interface LiveRaceModel {
  ponies: Array<PonyWithPositionModel>;
  status: 'PENDING' | 'RUNNING' | 'FINISHED';
}
