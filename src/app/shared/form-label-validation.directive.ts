/* tslint:disable:directive-selector */
import {AfterContentInit, ContentChild, Directive} from '@angular/core';
import {FormLabelDirective} from './form-label.directive';
import {NgControl} from '@angular/forms';

/*
* Changez le sélecteur de la directive en '.form-group' :
* cela appliquera automatiquement
* la directive à tous les éléments avec la classe form-group
*
* Ajoutez maintenant une méthode de cycle de vie ngAfterContentInit
* à notre directive, en implémentant l’interface appropriée
* */

@Directive({
  selector: '.form-group'
})
export class FormLabelValidationDirective implements AfterContentInit {

  /*utiliser le décorateur ContentChild !
  Ajoutez un champ à la directive appelé ngControl,
  du type NgControl, et décorez-le avec ContentChild.
  Ajoutez un autre champ à la directive,
  appelé label du type FormLabelDirective,
  et décorez ce champ avec ContentChild également.

  Commençons par ajouter une méthode setLabelValidity à notre directive.
  Cette méthode devra mettre à jour la valeur du champ isInvalid de label
  si le champ ngControl est dirty et invalid.

  Dans cette méthode du cycle de vie, ajoutez un if qui vérifie que
  ngControl et label sont bien tous deux définis
  (ce n’est pas forcément le cas, et si ce n’est pas le cas, nous n’avons rien à faire).
  S’ils sont tous deux définis, appelez la méthode setLabelValidity pour initialiser le champ isInvalid,
  et ensuite abonnez-vous à ngControl.statusChanges. À chaque fois que le statut change,
  nous voulons appeler setLabelValidity également.
  */

  @ContentChild(NgControl) ngControl: NgControl;
  @ContentChild(FormLabelDirective) label: FormLabelDirective;

  constructor() { }

  private setLabelValidity(): void {
    this.label.isInvalid = this.ngControl.invalid && this.ngControl.dirty;
  }

  ngAfterContentInit(): void {
    if (this.ngControl && this.label) {
      this.setLabelValidity();
      this.ngControl.statusChanges.subscribe(() => this.setLabelValidity());
    }
  }

}
