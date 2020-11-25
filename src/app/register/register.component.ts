import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  birthYearCtrl: FormControl;
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    /*
    const {
      loginCtrl,
      required,
      passwordCtrl,
      birthYearCtrl
    } = Validators;

    this.userForm = this.fb.group({
      loginCtrl: [ '', [loginCtrl, required]],
      passwordCtrl: [ '', [passwordCtrl, required]],
      birthYearCtrl: [ '', [birthYearCtrl, required]]
    });
    */

    this.loginCtrl = this.fb.control('', Validators.required);
    this.passwordCtrl = this.fb.control('', Validators.required);
    this.birthYearCtrl = this.fb.control('', Validators.required);
    this.userForm = this.fb.group({
      login: this.loginCtrl,
      password: this.passwordCtrl,
      birthYear: this.birthYearCtrl
    });
  }

  register(): void {}
}
