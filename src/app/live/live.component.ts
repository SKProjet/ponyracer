import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EMPTY, interval, Subject, Subscription} from 'rxjs';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import {bufferToggle, catchError, filter, groupBy, map, mergeMap, switchMap, tap, throttleTime} from 'rxjs/operators';

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
  winners: Array<PonyWithPositionModel>;
  betWon: boolean;
  /*
  * Ajoutez une propriété clickSubject au LiveComponent, de type Subject<PonyWithPositionModel>,
  * et initialisez cette propriété. La méthode onClick doit simplement
  * faire émettre le poney reçu en argument par le clickSubject.
  * */
  clickSubject = new Subject<PonyWithPositionModel>();

  constructor(private raceService: RaceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('raceId');
    this.positionSubscription = this.raceService
      .get(id)
      .pipe(
        tap((race: RaceModel) => (this.raceModel = race)),
        filter(race => this.raceModel.status !== 'FINISHED'),
        switchMap(race => this.raceService.live(race.id))
      )
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

    /***/

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
  /*
  * événements ponyClicked émis par les composants PonyComponent.
  * Ajoutez une méthode onClick sur le LiveComponent.
  * Cette méthode doit recevoir le poney sur lequel on a cliqué,
  * et doit être appelée lorsqu’un événement ponyClicked
  * est émis par l’un des poneys de la course.
  * */
  onClick(pony: PonyWithPositionModel): void {
    this.clickSubject.next(pony);
  }
  /*
  * une méthode ponyById dans notre composant LiveComponent.
  * Cette méthode doit recevoir l’index de l’élément et l’élément lui-même
  * (ici, un PonyWithPositionModel), et doit retourner une valeur qui
  * identifie l’élément : l’ID du poney.
  * */
  ponyById(index: number, pony: PonyWithPositionModel): number {
    return pony.id;
  }
}
