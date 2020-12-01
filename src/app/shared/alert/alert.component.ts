import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pr-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() dismissible = true;
  // Conditionnez l’affichage du bouton de fermeture à la valeur d’un nouvel
  // input dismissible, qui sera true par défaut.
  @Input() type = 'warning';
  @Output() readonly closed = new EventEmitter<void>();
  // qui émet un événement void sur un output nommée closed,
  // et qui est appelée au clic du bouton.

  constructor() { }

  ngOnInit(): void {
  }

/*  Ajoutez une méthode closeHandler dans le composant, */
  closeHandler(): void {
    this.closed.emit();
  }
/*
Ajoutez ensuite un getter alertClasses dans la classe AlertComponent.
Il devra retourner 'alert alert-danger'
*
si le type est 'danger',par exemple.
Utilisez ensuite cette propriété dans le template
pour ajouter ces classes CSS à l’élément racine div
*/
  get alertClasses(): string {
    return `alert alert-${this.type}`;
  }
}
