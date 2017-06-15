import { Component } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  signedIn: Observable<boolean>;

  constructor(public authenticationService: AuthenticationService) {
    this.signedIn = this.authenticationService.isSignedIn();
  }
}
