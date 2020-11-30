import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EMPTY, interval, Subject, Subscription} from 'rxjs';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import {bufferToggle, catchError, filter, groupBy, map, mergeMap, switchMap, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel> = [];
  positionSubscription: Subscription;
  error: boolean;
  winners: Array<PonyWithPositionModel> = [];
  betWon: boolean;
  clickSubject = new Subject<PonyWithPositionModel>();

  constructor(private raceService: RaceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    /*
    const id = +this.route.snapshot.paramMap.get('raceId');
    this.positionSubscription = this.raceService
      .get(id)
      .pipe(
        tap((race: RaceModel) => (this.raceModel = race)),
        filter(race => this.raceModel.status !== 'FINISHED'),
        switchMap(race => this.raceService.live(race.id))
      )

      => Vous pouvez donc aussi simplifier le code d’initialisation,
      en ne souscrivant au live de la course que si elle n’est pas
      déjà terminée, en utilisant un simple if
    * */

    this.raceModel = this.route.snapshot.data.race;
    if (this.raceModel.status !== 'FINISHED') {
      this.positionSubscription = this.raceService.live(this.raceModel.id)
        .subscribe({
          next: positions => {
            this.poniesWithPosition = positions;
            this.raceModel.status = 'RUNNING';
          },
        error: () => (this.error = true),
        complete: () => {
          this.raceModel.status = 'FINISHED';
          this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
          this.betWon = this.winners.some(pony => pony.id === this.raceModel.betPonyId);
        }
      });
    }

    this.clickSubject.pipe(groupBy(pony => pony.id, pony => pony.id),
      mergeMap(obs => obs.pipe(bufferToggle(obs, () => interval(1000)))),
      filter(array => array.length >= 5), throttleTime(1000),
      map(array => array[0]),
      switchMap(ponyId => this.raceService.boost(this.raceModel.id, ponyId).pipe(catchError(() => EMPTY)))
    ).subscribe(() => {});
  }


  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription
        .unsubscribe();
    }
}

  onClick(pony: PonyWithPositionModel): void {
    this.clickSubject.next(pony);
  }

  ponyById(index: number, pony: PonyWithPositionModel): number {
    return pony.id;
  }
}
