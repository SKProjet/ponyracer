import { Component, OnInit } from '@angular/core';

import { RaceService } from '../race.service';

@Component({
  selector: 'pr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

  races: Array<any>;

  constructor(private raceService: RaceService ) { }

  ngOnInit(): void {
// Injectez ce service dans notre composant RacesComponent,
// et initialisez la liste des courses avec ce que renvoie
// la méthode list() du service.
    this.races = this.raceService.list();
  }

}
