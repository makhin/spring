import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    templateUrl: 'signin.component.html'
})

export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  loaded = false;
  validationMessages = {
    'email': {
      'required': 'Адрес обязателен'
    },
    'password': {
      'required': 'Пароль обязателен',
    }
  };

  constructor(private fb: FormBuilder,
              private toastrService: ToastrService,
              public router: Router,
              public authenticationService: AuthenticationService) { }

  buildForm(): void {
    this.signinForm = this.fb.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
    this.signinForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.signinForm) {
      return;
    }
    const form = this.signinForm;
    for (const controlName in this.signinForm.controls) {
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
    this.loaded = true;
  }

  signin(): void {
    this.authenticationService.signin(this.signinForm.value)
      .subscribe(
        () => {
          // Optional strategy for refresh token through a scheduler.
          this.authenticationService.scheduleRefresh();

          // Gets the redirect URL from authentication service.
          // If no redirect has been set, uses the default.
          const redirect: string = this.authenticationService.redirectUrl
            ? this.authenticationService.redirectUrl
            : '';

          // Redirects the user.
          this.router.navigate([redirect]);
        },
        (error: any) => {
          // Checks for error in response (error from the Token endpoint).
          if (error.body !== '') {
            const body: any = error.json();

            switch (body.error) {
              case 'invalid_grant':
                this.toastrService.error('Неправильное имя или пароль');
                break;
              default:
                this.toastrService.error('Неизвестная ошибка. Попробуйте ещё раз.');
            }
          } else {
            const errMsg = (error.message) ? error.message :
              error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            console.log(errMsg);
            this.toastrService.error('Серверная ошибка. Попробуйте позже.');
          }
        });
  }
}
