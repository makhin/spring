import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AuthHttp } from 'angular2-jwt';
import {JsonHeaderService} from '../Shared/jsonHeader.service';
@Injectable() export class IdentityService {

  constructor(private authHttp: AuthHttp, private http: Http, private jsonHeader: JsonHeaderService) {
  }

  public GetAll(): Observable<any> {
    // Sends an authenticated request.
    return this.authHttp.get('/api/identity/GetAll')
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  public Create(model: any): Observable<any> {
    const body: string = JSON.stringify(model);

    return this.http.put('/api/identity', body, this.jsonHeader.jsonHeaders())
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  public Delete(username: string): Observable<any> {
    const body: string = JSON.stringify(username);

    // Sends an authenticated request.
    return this.authHttp.delete('/api/identity' + body, this.jsonHeader.jsonHeaders())
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }

  public Update(model: any): Observable<any> {
    const body: string = JSON.stringify(model);

    return this.http.post('/api/identity', body, this.jsonHeader.jsonHeaders())
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => {
        return Observable.throw(error);
      });
  }
}
