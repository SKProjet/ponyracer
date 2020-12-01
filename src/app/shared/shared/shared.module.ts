import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertComponent} from '../alert/alert.component';
import {FormControlValidationDirective} from '../form-control-validation.directive';
import {FormLabelValidationDirective} from '../form-label-validation.directive';
import {FormLabelDirective} from '../form-label.directive';

/*
un nouveau module nommé SharedModule.
AlertComponent à l’attribut exports du décorateur du SharedModule,
et importer le SharedModule dans UsersModule et RacesModule.
* */

@NgModule({
  declarations: [
    AlertComponent,
    FormControlValidationDirective,
    FormLabelValidationDirective,
    FormLabelDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    FormControlValidationDirective,
    FormLabelValidationDirective,
    FormLabelDirective
  ]
})
export class SharedModule { }
