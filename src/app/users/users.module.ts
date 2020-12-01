import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { USERS_ROUTES } from './users.routes';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import {SharedModule} from '../shared/shared/shared.module';

/*
* Créons un AlertComponent !
Comme ce composant sera utilisé par des composants du UsersModule,
* commencez par générer, avec Angular CLI, un nouveau module nommé SharedModule.
*
*
* Pour cela, il faut ajouter AlertComponent à l’attribut exports du décorateur
* du SharedModule, et importer le SharedModule dans UsersModule.
*
*
* */

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(USERS_ROUTES),
    SharedModule
  ]
})
export class UsersModule { }

