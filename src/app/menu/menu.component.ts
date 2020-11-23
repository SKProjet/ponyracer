import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  /*1- ajouter un champ navbarCollapsed dans le composant, initialisé à vrai (le menu est fermé par défaut)
   *3- écrire cette méthode pour qu’elle mette à jour le champ navbarCollapsed du composant de vrai à faux, ou de faux à vrai.
   * */

  navbarCollapsed = true;
  toggleNavbar(): void {
    this.navbarCollapsed =!this.navbarCollapsed;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
