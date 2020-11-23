import { Component, OnInit } from '@angular/core';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';

@Component({
  selector: 'pr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

  // races: Array<any>;
  races: Array<RaceModel> = [];

  constructor(private raceService: RaceService ) { }

  ngOnInit(): void {
    // https://angular-exercises.ninja-squad.com/faq#subscribe
    this.raceService.list().subscribe(races => this.races = races);
  }

}
