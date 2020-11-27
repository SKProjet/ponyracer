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
  @Output() readonly ponyClicked = new EventEmitter<PonyModel>();

  getPonyImageUrl(): string {
    // return `assets/images/pony-${this.ponyModel.color.toLowerCase()}.gif`;
    return `assets/images/pony-${this.ponyModel.color.toLowerCase()}${this.isRunning ? '-running' : ''}.gif`;
  }

  clicked(): void {this.ponyClicked.emit(this.ponyModel); }

  constructor() { }

  ngOnInit(): void {
  }

}
