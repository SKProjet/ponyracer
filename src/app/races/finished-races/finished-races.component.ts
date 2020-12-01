import { Component, OnInit } from '@angular/core';
import {RaceModel} from '../../models/race.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './finished-races.component.html',
  styleUrls: ['./finished-races.component.css']
})
export class FinishedRacesComponent implements OnInit {

  /* Ajoutez un composant pagination en haut du template.
  Utilisez pour ça une nouvelle propriété page,
  initialisée à 1 pour afficher la première page. */
  races: Array<RaceModel>;
  page = 1;

  constructor(route: ActivatedRoute) {
    this.races = route.snapshot.data.races;
  }

  ngOnInit(): void { }

}
