import { Component, OnInit } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import { PonyModel } from '../models/pony.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {
  /*
  nous allons utiliser l’événement
  custom ponyClicked.
  En effet, vous allez appeler
  la méthode betOnPony(pony)
  à chaque fois que cet événement
  sera émis par un composant
  PonyComponent.
  */
  raceModel: RaceModel;
  betFailed = false;

  constructor(private raceService: RaceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(id).subscribe(race => (this.raceModel = race));
  }
  /*
  La méthode betOnPony(pony) est bien
  évidemment à créer dans le composant.
  Elle devra appeler la méthode
  bet de notre RaceService
   */
  betOnPony(pony: PonyModel): void {
    this.raceService.bet(this.raceModel.id, pony.id).subscribe({
      next: race => (this.raceModel = race),
      error: () => (this.betFailed = true)
    });
  }

  /*
  Créez donc une méthode isPonySelected(pony)
  qui renverra vrai si le poney en paramètre a le même id
  que celui défini dans l’attribut betPonyId de la course.
  */
  isPonySelected(pony: PonyModel): boolean {
    return pony.id === this.raceModel.betPonyId;
  }

}
