import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  signedIn: Observable<boolean>;
  name: Observable<string>;

  constructor(public authenticationService: AuthenticationService, private router: Router) {

    this.signedIn = this.authenticationService.isSignedIn();

    this.name = this.authenticationService.getUser()
      .map((user: any) => (typeof user.given_name !== 'undefined') ? user.given_name : null);

    this.authenticationService.startupTokenRefresh();
  }

  signout(): void {
    this.authenticationService.signout();
    this.router.navigate(['/home']);
  }
}
