import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Response} from '@angular/http';

@Injectable()
export class ErrorHandler {

  constructor() {
  }

  static handleError(error: Response | any) {
    let modelStateErrors: string = '';
    let applicationError: string = '';

    if (error instanceof Response){
      if (error.status === 400){
        const data = error.json();
        data.forEach((err) => {
          modelStateErrors += err.errorMessage + "; ";
        });
      }
      else {
        const body = error.text() || '';
        applicationError = `${error.status} - ${error.statusText || ''} ${body}`;
      }
    }
    else {
      applicationError = error.message ? error.message : error.toString();
    }
    modelStateErrors = modelStateErrors === '' ? null : modelStateErrors;
    return Observable.throw(applicationError || modelStateErrors || 'Server error');
  }

}
