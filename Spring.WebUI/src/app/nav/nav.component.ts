import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  signedIn: Observable<boolean>;
  name: string;
  isAdmin: boolean;

  constructor(public authenticationService: AuthenticationService, private router: Router) {
    this.signedIn = this.authenticationService.isSignedIn();

    this.authenticationService.userChanged().subscribe(
      (user: User) => {
        this.name = user.givenName;
        this.isAdmin = this.authenticationService.isInRole('admin');
      });

    this.authenticationService.startupTokenRefresh();
  }

  signout(): void {
    this.authenticationService.signout();
    this.router.navigate(['/home']);
  }
}
