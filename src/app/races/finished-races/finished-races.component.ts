import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {RaceModel} from '../../models/race.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './finished-races.component.html',
  styleUrls: ['./finished-races.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinishedRacesComponent implements OnInit {

  races: Array<RaceModel>;
  page = 1;

  constructor(route: ActivatedRoute) {
    this.races = route.snapshot.data.races;
  }

  ngOnInit(): void { }

}
