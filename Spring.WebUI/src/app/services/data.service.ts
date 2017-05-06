import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http, Response, Headers} from '@angular/http';
import {NgbDate} from "@ng-bootstrap/ng-bootstrap/datepicker/ngb-date";
import {Contract} from "app/models/Contract";
import {AuthService} from "../Shared/auth.service";
import {ContractItem} from "../models/ContractItem";

@Injectable()
export class DataService {

  constructor(private http: Http, private authService: AuthService) {
  }

  getAllContracts(): Observable<Array<ContractItem>> {
    return this.http.get('api/contracts/', { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => resp.json())
      .map((data: any) => {return <Array<ContractItem>>data;})
      .catch(this.handleError);
  }

  getContract(id: number): Observable<Contract> {
    return this.http.get('api/contracts/' + id)
      .map((resp:Response) => JSON.parse(resp.text(), this.reviver))
      .map((data: Contract) => data)
      .catch(this.handleError);
  }

  editContract(contract: Contract) {
    const clone = { ...(new Contract()), ...contract };
    let body = JSON.stringify(clone, this.replacer);
    return this.http
      .post('api/contracts/', body, { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => {return;})
      .catch(this.handleError);
  }

  addContract(contract: Contract) {
    const clone = { ...(new Contract()), ...contract };
    let body = JSON.stringify(clone, this.replacer);
    return this.http
      .put('api/contracts/', body, { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => JSON.parse(resp.text(), this.reviver))
      .map((data: Contract) => data)
      .catch(this.handleError);
  }

  deleteContract(id: number) {
    return this.http.delete('api/contracts/' + id, { headers: this.authService.jsonHeaders() })
      .map((res: Response) => {return;})
      .catch(this.handleError);
  }

  reviver(key, value): any {
    var datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    if (typeof value === "string" && datePattern.test(value)) {
      let d = new Date(value);
      let date = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
      return new NgbDate(date.getFullYear(), date.getMonth()+1, date.getDate());
    }

    return value;
  }

  replacer(key, value): any {
    if (typeof(value) === 'object') {
      for (var k in value) {
        if (value[k] != null && value[k].hasOwnProperty('year') && value[k].hasOwnProperty('month') && value[k].hasOwnProperty('day')) {
          var d = new Date(value[k].year, value[k].month-1, value[k].day);
          value[k] = new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString();
        }
      }
    }
    return value;
  }

  private handleError(error: any) {
    var applicationError = error.headers.get('Application-Error');
    var serverError = error.json();
    var modelStateErrors: string = '';

    if (!serverError.type) {
      console.log(serverError);
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }
    modelStateErrors = modelStateErrors === '' ? null : modelStateErrors;
    return Observable.throw(applicationError || modelStateErrors || 'Server error');
  }

  /*
   private static handleError(error: Response | any) {
   // In a real world app, we might use a remote logging infrastructure
   let errMsg: string;
   if (error instanceof Response) {
   const body = error.text() || '';
   errMsg = `${error.status} - ${error.statusText || ''} ${body}`;
   }
   else {
   errMsg = error.message ? error.message : error.toString();
   }
   console.log(errMsg);
   return Observable.throw(errMsg);
   }
   */
}
