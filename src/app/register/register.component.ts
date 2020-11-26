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

  static passwordMatch(group: FormGroup): { matchingError: true } | null {
    const password = group.get('password').value;
    const confirm = group.get('confirmPassword').value;
    return password === confirm ? null : { matchingError: true };
  }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {

    this.loginCtrl = this.fb.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = this.fb.control('', Validators.required);
    this.birthYearCtrl = this.fb.control('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]);
    this.confirmPasswordCtrl = this.fb.control('', Validators.required);
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


