import {Directive, HostBinding} from '@angular/core';

/*
Utilisons donc un sélecteur un peu plus fin : label[prFormLabel]
*/
@Directive({
  selector: 'label[prFormLabel]'
})
export class FormLabelDirective {
  @HostBinding('class.text-danger') isInvalid = false;

  constructor() { }

}
