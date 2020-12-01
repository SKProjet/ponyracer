import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertComponent} from '../alert/alert.component';
import {FormControlValidationDirective} from '../form-control-validation.directive';
import {FormLabelValidationDirective} from '../form-label-validation.directive';
import {FormLabelDirective} from '../form-label.directive';
import {NgbAlertModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

/*
 Ajouter NgbAlertModule aux imports du module SharedModule.
 Ajoutez NgbAlertModule aux exports du SharedModule,
 pour rendre ce composant ng-bootstrap disponible dans
 tous les modules de l’application
 (UsersModule et RacesModule importent tous les deux SharedModule)
*/

@NgModule({
  declarations: [
    AlertComponent,
    FormControlValidationDirective,
    FormLabelValidationDirective,
    FormLabelDirective
  ],
  imports: [
    CommonModule,
    NgbAlertModule,
    NgbPaginationModule
  ],
  exports: [
    AlertComponent,
    FormControlValidationDirective,
    FormLabelValidationDirective,
    FormLabelDirective,
    NgbAlertModule
  ]
})
export class SharedModule { }
