import { Component, OnInit } from '@angular/core';
import {RaceModel} from '../../models/race.model';
// import {RaceService} from '../../race.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './pending-races.component.html',
  styleUrls: ['./pending-races.component.css']
})
export class PendingRacesComponent implements OnInit {

  races: Array<RaceModel> = [];
  // constructor(private raceService: RaceService ) { }
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.raceService.list('PENDING').subscribe(races => this.races = races);
    this.races = this.route.snapshot.data.races;

  }

}
