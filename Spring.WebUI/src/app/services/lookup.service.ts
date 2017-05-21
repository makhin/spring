import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import {AuthService} from "../Shared/auth.service";
import {ErrorHandler} from "../Shared/ErrorHandler";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LookupService implements OnInit  {

  constructor(private http: Http, private authService: AuthService) {
  }

  ngOnInit() {

  }

  getTherapy(): Observable<string> {
    return this.http.get('api/lookup/therapy', {headers: this.authService.jsonHeaders()})
      .map((resp: Response) => resp.json())
      .catch(ErrorHandler.handleError)
  }

  getThreatment(): Observable<string> {
    return this.http.get('api/lookup/treatment', {headers: this.authService.jsonHeaders()})
      .map((resp: Response) => resp.json())
      .catch(ErrorHandler.handleError)
  }

  getMkb10(s: string) {
    return this.http.get('api/lookup/' + s + '/mkb10', {headers: this.authService.jsonHeaders()})
      .map((res: Response) => res.json())
      .catch(ErrorHandler.handleError);
  }

  getHospital(parentId?: number) {
    return this.http.get('api/lookup/' + parentId + '/hospital', {headers: this.authService.jsonHeaders()})
      .map((res: Response) => res.json())
      .catch(ErrorHandler.handleError);
  }

}
