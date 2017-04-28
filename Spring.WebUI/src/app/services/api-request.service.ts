import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../security/auth.service';
import { ToastrService } from 'ngx-toastr';

import { ViewModelResponse } from '../models/ViewModelResponse';

@Injectable()
export class ApiRequestService<T> {
  protected url: string;

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

  getAll(): Observable<Array<T>> {
    return this.http.get(this.url)
      .map((resp: Response) => resp.json())
      .map((data: ViewModelResponse) => {
        if (data != null && data.statusCode === 200) {
          return data.value as Array<T>;
        } else {
          Observable.throw('Request has failed ' + data.statusCode);
        }
      })
      .catch(ApiRequestService.handleError);
  }

  getById(id: number): Observable<T> {
    if (id == null) {
      throw new Error('id is required.');
    }
    return this.http.get(this.url + '/' + id, { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => resp.json())
      .map((data: ViewModelResponse) => {
        if (data != null && data.statusCode === 200) {
          return data.value as T;
        } else {
          Observable.throw('Request has failed ' + data.statusCode);
        }
      })
      .catch(ApiRequestService.handleError);
  }

  addEntity(entity: T) {
    return this.http
      .put(this.url, JSON.stringify(entity), { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => resp.json())
      .map((data: ViewModelResponse) => {
        if (data != null && data.statusCode === 200) {
          return data.value as T;
        } else {
          Observable.throw('Request has failed ' + data.statusCode);
        }
      })
      .catch(ApiRequestService.handleError);
  }

  editEntity(entity: T) {
    return this.http
      .post(this.url, JSON.stringify(entity), { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => resp.json())
      .map((data: ViewModelResponse) => {
        if (data != null && data.statusCode === 200) {
          this.toastrService.success('Hello world!', 'Toastr fun!');
          return data.value as T;
        } else {
          Observable.throw('Request has failed ' + data.statusCode);
        }
      })
      .catch(ApiRequestService.handleError);
  }

  deleteEntity(id: number) {
    return this.http.delete(this.url + '/' + id, { headers: this.authService.jsonHeaders() })
      .map((res: Response) => res.json())
      .map((data: ViewModelResponse) => {
        if (data != null && data.statusCode === 200) {
          return data.value as number;
        } else {
          Observable.throw('Request has failed ' + data.statusCode);
        }
      })
      .catch(ApiRequestService.handleError);
  }
}
