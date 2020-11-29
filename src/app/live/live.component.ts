import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import {filter, switchMap, tap} from 'rxjs/operators';

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

  constructor(private raceService: RaceService, private route: ActivatedRoute) {}


  /*
  * la méthode ngOnInit, afin qu’elle commence
  * par charger le détail de la course,
  * la stocke dans une propriété du composant,
  * et ne souscrive aux positions que si elle n’est pas encore terminée.
    Pour faire cela :
    appelez la méthode raceService.get(id)
    * qui retourne un observable ;
    stockez la course reçue dans la propriété
    * raceModel du composant, via l’opérateur tap ;
    ajoutez un appel à filter pour n’émettre la course
    * que si son état est différent de 'FINISHED' ;
    transformez cet événement unique contenant
    * la course non terminée en une séquence d’événements
    * contenant les positions des poneys en utilisant
    * l’opérateur switchMap et en appelant le service raceService.live(id) ;
    souscrivez ensuite aux positions.
  *
  * */

  /*
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(id).subscribe(race => (this.raceModel = race));
    this.positionSubscription = this.raceService.live(id).subscribe(
      positions => (this.poniesWithPosition = positions)
    );
  }
  */

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
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription
        .unsubscribe();
    }
  }
}
