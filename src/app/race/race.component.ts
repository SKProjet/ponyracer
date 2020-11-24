import { Component, OnInit, Input } from '@angular/core';
import { RaceModel } from '../models/race.model';

@Component({
  selector: 'pr-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  /*
  * avoir une entrée (@Input()) nommée raceModel
  * N’oubliez pas d’importer Input depuis @angular/core
  * */

  @Input() raceModel: RaceModel;

  constructor() { }

  ngOnInit(): void {
  }

}
