export interface PonyModel {
  id: number;
  name: string;
  color: string;
}

export interface PonyWithPositionModel extends PonyModel {
  position: number;
  /*
  LiveComponent afin de lier l’input à la propriété boostedajouter
  cette propriété boosted (optionnelle) à l’interface PonyWithPositionModel.
  */
  boosted?: boolean;
}
