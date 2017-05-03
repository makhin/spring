import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../security/auth.service';
import { ToastrService } from 'ngx-toastr';

import {IEntity} from '../models/IEntity';

@Injectable()
export class ApiRequestService {
  public url: string;

  private static handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.text() || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${body}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

  constructor(private http: Http, private authService: AuthService, private toastrService: ToastrService) {
  }

  getAll<T extends IEntity>(): Observable<Array<T>> {
    return this.http.get(this.url, { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => resp.json())
      .map((data: any) => {
          return data as Array<T>;
      })
      .catch(ApiRequestService.handleError);
  }

  getById<T extends IEntity>(id: number): Observable<T> {
    if (id == null) {
      throw new Error('id is required.');
    }
    return this.http.get(this.url + '/' + id, { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => resp.json())
      .map((data: any) => {
          return data as T;
      })
      .catch(ApiRequestService.handleError);
  }

  addEntity<T extends IEntity>(entity: T) {
    return this.http
      .put(this.url, JSON.stringify(entity), { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => resp.json())
      .map((data: any) => {
          return data as T;
      })
      .catch(ApiRequestService.handleError);
  }

  editEntity<T extends IEntity>(entity: T) {
    return this.http
      .post(this.url, JSON.stringify(entity), { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => resp.json())
      .map((data: any) => {
          this.toastrService.success('Hello world!', 'Toastr fun!');
          return data as T;
      })
      .catch(ApiRequestService.handleError);
  }

  deleteEntity<T extends IEntity>(id: number) {
    return this.http.delete(this.url + '/' + id, { headers: this.authService.jsonHeaders() })
      .map((res: Response) => res.json())
      .map((data: any) => {
          return data as number;
      })
      .catch(ApiRequestService.handleError);
  }
}
