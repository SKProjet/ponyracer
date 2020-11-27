import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel>;
  positionSubscription: Subscription;

  constructor(private raceService: RaceService, private route: ActivatedRoute) {}

  /*
  * souscrivez à l’observable retourné par le service depuis la méthode ngOnInit.
  * Chaque fois qu’un événement est émis, stockez les positions reçues dans
  * une propriété nommée poniesWithPosition de type Array<PonyWithPositionModel>.
  * Pensez à aussi stocker la souscription elle-même dans une propriété
  * positionSubscription, et à vous désabonner (unsubscribe)
  * depuis la méthode ngOnDestroy.
  * */


  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(id).subscribe(race => (this.raceModel = race));
    this.positionSubscription = this.raceService.live(id).subscribe(
      positions => (this.poniesWithPosition = positions)
    );
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription
        .unsubscribe();
    }
  }

}
