import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {
  @Input() ponyModel: PonyModel;
  @Input() isRunning: boolean;
  /*
  * ajouter un input isBoosted à notre PonyComponent.
  * Cette input est un booléen, et sert à déterminer l’URL
  * de l’image à afficher. Quand isBoosted est true,
  * */
  @Input() isBoosted: boolean;
  @Output() readonly ponyClicked = new EventEmitter<PonyModel>();

  getPonyImageUrl(): string {
    return `assets/images/pony-${this.ponyModel.color.toLowerCase()}${this.isBoosted ? '-rainbow' : this.isRunning ? '-running' : ''}.gif`;
  }

  clicked(): void {this.ponyClicked.emit(this.ponyModel); }

  constructor() { }

  ngOnInit(): void {
  }

}
