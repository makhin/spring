import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import {JsonHeaderService} from "../Shared/jsonHeader.service";
import {ErrorHandler} from "../Shared/ErrorHandler";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LookupService implements OnInit  {

  constructor(private http: Http, private jsonHeaderService: JsonHeaderService) {
  }

  ngOnInit() {

  }

  getTherapy(): Observable<string> {
    return this.http.get('api/lookup/therapy')
      .map((resp: Response) => resp.json())
      .catch(ErrorHandler.handleError)
  }

  getThreatment(): Observable<string> {
    return this.http.get('api/lookup/treatment')
      .map((resp: Response) => resp.json())
      .catch(ErrorHandler.handleError)
  }

  getMkb10(s: string) {
    return this.http.get('api/lookup/' + s + '/mkb10')
      .map((res: Response) => res.json())
      .catch(ErrorHandler.handleError);
  }

  getHospital(parentId?: number) {
    return this.http.get('api/lookup/' + parentId + '/hospital')
      .map((res: Response) => res.json())
      .catch(ErrorHandler.handleError);
  }

}
