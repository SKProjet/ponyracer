import { PonyModel, PonyWithPositionModel } from './pony.model';

export interface RaceModel {
  id: number;
  name: string;
  ponies: Array<PonyModel>;
  startInstant: string;
  betPonyId?: number;
}
/*  Créez une interface LiveRaceModel dans race.model.ts,
contenant un champ ponies, ce champ étant un
tableau de PonyWithPositionModel.*/
export interface LiveRaceModel {
  ponies: Array<PonyWithPositionModel>;
}
