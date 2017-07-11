import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { IdentityService } from '../services/identity.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../services/authentication.service';

@Component({
    templateUrl: 'signup.component.html'
})

export class SignupComponent implements OnInit  {
  signupForm: FormGroup;
  validationMessages = {
    'email': {
      'required': 'Адрес обязателен'
    },
    'password': {
      'required': 'Пароль обязателен',
    },
    'firstName': {
      'required': 'Имя обязателено'
    },
    'lastName': {
      'required': 'Фамилия обязательна',
    }
  };

  constructor(private fb: FormBuilder,
              private toastrService: ToastrService,
              public router: Router,
              public authenticationService: AuthenticationService,
              private identityService: IdentityService) { }

  buildForm(): void {
    this.signupForm = this.fb.group({
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
    this.signupForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.signupForm) {
      return;
    }
    const form = this.signupForm;
    for (const controlName in this.signupForm.controls) {
      const control = form.get(controlName);
      if (control && control.dirty && !control.valid) {
        const message = this.validationMessages[controlName];
        for (const key in control.errors) {
          this.toastrService.error(message[key], null)
        }
      }
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  signup(): void {
    this.identityService.Create(this.signupForm.value)
      .subscribe(
        (res: any) => {
          if (res.succeeded) {
            this.authenticationService.signin({email: this.signupForm.value.email, password: this.signupForm.value.password})
              .subscribe(
                () => {
                  this.authenticationService.scheduleRefresh();
                  this.router.navigate(['']);
                });
          } else {
            this.toastrService.error(res.errors);
          }
        },
        (error: any) => {

          const errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
          console.log(errMsg);
          this.toastrService.error('Серверная ошибка. Попробуйте позже.');
        });
  }
}
