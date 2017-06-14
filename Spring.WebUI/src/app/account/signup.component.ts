import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IdentityService } from '../services/identity.service';

@Component({
    templateUrl: 'signup.component.html'
})
export class SignupComponent {

    errorMessages: string[] = [];
    model: any = {};
    errorMessage: string = "";

    constructor(
        public router: Router,
        private identityService: IdentityService
    ) {

    }

    signup(): void {
        this.identityService.Create(this.model)
            .subscribe(
            (res: any) => {
                // IdentityResult.
                if (res.succeeded) {
                    // Signs in the user.
                    //this.signin();
                } else {
                    this.errorMessages = res.errors;
                }
            },
            (error: any) => {
                const errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                console.log(errMsg);
                this.errorMessage = "Server error. Try later.";
            });
    }

}
