import { PonyModel } from './pony.model';

export interface RaceModel {
  id: number;
  name: string;
  ponies: Array<PonyModel>;
  startInstant: string;
  // Ajoutez le champ betPonyId à RaceModel
  betPonyId?: number;
}

