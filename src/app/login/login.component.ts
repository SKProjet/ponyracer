import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
/*
Le composant devra avoir un champ nommé credentials,
initialisé avec un objet possédant les champs suivants :
login, initialisé avec une chaîne vide, lié à un input
obligatoire dans le template dont le name sera login.
password, initialisé avec une chaîne vide,

* Si le formulaire est correctement rempli et soumis,
* la méthode authenticate() sera appelée.
* Celle-ci fera un appel à une méthode
* authenticate(credentials: {login: string; password: string})
* du service UserService à créer également.
* Cette méthode renverra un Observable auquel vous devrez souscrire.
* En cas de succès, l’utilisateur sera redirigé vers le composant Home.
* En cas d’échec, un booléen authenticationFailed devra être passé à true
* Ce booléen sera utilisé dans le template pour afficher un message d’erreur.
* */

  credentials = { login: '', password: '' };
  authenticationFailed = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {}

  /* Si le formulaire est correctement rempli et soumis,
     la méthode authenticate() sera appelée.
   */


  authenticate(): void{
    this.userService.authenticate(
      this.credentials,
    ).subscribe(
      data => {
        this.router.navigate(['/']);
      }, error => {
        this.authenticationFailed = true;
      }
    );
  }

}
