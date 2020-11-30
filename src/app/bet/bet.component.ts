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

  raceModel: RaceModel;
  betFailed = false;

  constructor(private raceService: RaceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.raceModel = this.route.snapshot.data.race;
    /*const id = +this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(id).subscribe(race => (this.raceModel = race));*/
  }

  betOnPony(pony: PonyModel): void {
    if (!this.isPonySelected(pony)) {
      this.raceService.bet(this.raceModel.id, pony.id).subscribe(
        race => this.raceModel = race, error => this.betFailed = true);
    } else {
      this.raceService.cancelBet(this.raceModel.id).subscribe({
        next: () => this.raceModel.betPonyId = null,
        error: () => this.betFailed = true});
    }
  }

  isPonySelected(pony: PonyModel): boolean{
    if (pony.id === this.raceModel.betPonyId){
      return true;
    }else{
      return false;
    }
  }

}
