/* tslint:disable:directive-selector */
import {Directive, HostBinding} from '@angular/core';
import {NgControl} from '@angular/forms';

// Changez le sélecteur de la directive en '.form-control'
@Directive({
  selector: '.form-control'
})
export class FormControlValidationDirective {
/*
*Ajoutez donc un paramètre nommé ngControl au constructeur.
* on peut utiliser un autre décorateur : HostBinding.
Ajoutez un getter isInvalid() à la directive,
* qui retourne true si ngControl existe, est dirty, et invalide.
* Décorez le getter avec HostBinding (et le paramètre adéquat)
*  pour ajouter automatiquement la classe is-invalid lorsque le getter retourne true.
* */
  constructor(private ngControl: NgControl) {}

  @HostBinding('class.is-invalid') get isInvalid(): boolean {
    return this.ngControl && this.ngControl.dirty && this.ngControl.invalid;
  }

}
