import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../services/authentication.service';
import {User} from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  signedIn: Observable<boolean>;
  isUser = false;

  constructor(public authenticationService: AuthenticationService) {
    this.signedIn = this.authenticationService.isSignedIn();
    this.authenticationService.userChanged().subscribe((user: User) => {
      const roles: string[] = typeof user.roles !== 'undefined' ? user.roles : [];
      this.isUser = roles.indexOf('user') !== -1;
    });
  }
}
