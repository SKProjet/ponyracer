import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {
  @Input() ponyModel: PonyModel;
  @Output() readonly ponyClicked = new EventEmitter<PonyModel>();

  /*
  Ecrivez ensuite le template du composant.
  Celui-ci est un élément figure contenant
  une balise img dont l’URL est dynamique et
  appelle une méthode de notre composant getPonyImageUrl()
  pour la récupérer.

  Bien évidemment, vous devez coder cette méthode dans votre composant.
  Elle devra retourner le chemin complet sur le modèle assets/images/pony-purple.gif
  si le poney est de la couleur PURPLE.
  Indice : la méthode toLowerCase() permet de passer une chaîne de caractères en minuscule.

  Pour cela, ajoutez un écouteur de click sur la figure racine du template,
  qui appellera la méthode clicked() du composant.
  Celle-ci émettra le poney à travers un EventEmitter nommé ponyClicked,
  que vous devrez avoir déclaré comme @Output() du composant.
  */

  getPonyImageUrl(): string {
    return `assets/images/pony-${this.ponyModel.color.toLowerCase()}.gif`;
  }

  clicked(): void {this.ponyClicked.emit(this.ponyModel); }

  constructor() { }

  ngOnInit(): void {
  }

}
