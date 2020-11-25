import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService} from '../user.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  birthYearCtrl: FormControl;
  userForm: FormGroup;
  confirmPasswordCtrl: FormControl;
  passwordForm: FormGroup;
  registrationFailed: boolean;

  /*
  Pour cela créez une méthode statique dans le composant nommée passwordMatch
  * qui prendra comme paramètre le FormGroup qui renverra un
  * objet avec un attribut matchingError à true si les champs ne sont pas
  * égaux ou null si ils sont égaux. Ce validateur sera donc utilisé par passwordForm
  *
  */
  static passwordMatch(group: FormGroup): { matchingError: true } | null {
    const password = group.get('password').value;
    const confirm = group.get('confirmPassword').value;
    return password === confirm ? null : { matchingError: true };
  }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {

    this.loginCtrl = this.fb.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = this.fb.control('', Validators.required);
    /*
    * utilisant les validateurs Validators.min() et Validators.max(),
    * une date valide si sa valeur est supérieure ou égale à 1900,
    * et est au maximum l’année courante.
    * L’année courante peut être obtenue grâce à new Date().getFullYear()).
    * Deviens_un_Ninja_avec_Angular.pdf 19.8. Regrouper des champs
    * */
    this.birthYearCtrl = this.fb.control('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]);
    /*
    autre champ FormControl nommé confirmPasswordCtrl
    */
    this.confirmPasswordCtrl = this.fb.control('', Validators.required);
    /*
    Ce validateur sera donc utilisé par passwordForm
    */
    this.passwordForm = this.fb.group(
      { password: this.passwordCtrl, confirmPassword: this.confirmPasswordCtrl },
      { validators: RegisterComponent.passwordMatch }
      );
    this.userForm = this.fb.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });

/*            à voir pour factoriser
   const { required, minLength, min, max } = Validators;
   this.userForm = this.fb.group({
     loginCtrl: [ '', [minLength(3), required]],
     passwordCtrl: [ '', [required]],
     birthYearCtrl: [ '', [required]]
   });
*/

  }

  /*
  * implémenter la méthode register du composant RegisterComponent.
  * Celle-ci devra faire appel à la méthode register de notre UserService.
  * En cas de succès de cet appel,
  * on redirigera l’utilisateur sur la page d’accueil,
  * avec router.navigate().
  * En cas d’échec, on passera une propriété (à créer)
  * du composant registrationFailed à true.
  * */

  register(): void{
      this.userService.register(
      this.userForm.value.login,
      this.userForm.value.passwordForm.password,
      this.userForm.value.birthYear
      ).subscribe(
          data => {
        this.router.navigate(['/']);
          }, error => {
        this.registrationFailed = true;
      }
    );
  }

}


