import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import {Observable} from 'rxjs/Observable';

@Injectable() export class AuthGuard implements CanActivate {

    constructor(public authenticationService: AuthenticationService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
      return this.authenticationService.isSignedIn().map((signedIn: boolean) => {
        const url: string = state.url;

        const allowedRoles = route.data['roles'] as Array<string>;
        if (allowedRoles == null || allowedRoles.length === 0) {
          return true;
        }

        if (signedIn) {
          for (const role of allowedRoles) {
            if (this.authenticationService.isInRole(role)) {
              return true;
            }
          }
          this.router.navigate(['/home']);
          return false;
        }

        // Stores the attempted URL for redirecting.
        this.authenticationService.redirectUrl = url;

        // Not signed in so redirects to signin page.
        this.router.navigate(['/account/signin']);
        return false;
      });
    }
}
