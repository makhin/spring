import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http, Response, Headers} from '@angular/http';
import {Contract} from "app/models/Contract";
import {AuthService} from "../Shared/auth.service";
import {ContractItem} from "../models/ContractItem";
import {CustomerItem} from "../models/CustomerItem";

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

  getCustomersByContract(id: number){
    return this.http.get('api/customers/' + id, { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => resp.json())
      .map((data: any) => {return <Array<CustomerItem>>data;})
      .catch(this.handleError);
  }

  reviver(key, value): any {
    var datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    if (typeof value === "string" && datePattern.test(value)) {
      let d = new Date(value);
      let date = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
      return {year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()};
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

  private handleError(error: Response | any) {
    var modelStateErrors: string = '';
    var applicationError: string = '';

    if (error instanceof Response){
        if (error.status === 400){
          const data = error.json();
          data.forEach((err) => {
            modelStateErrors += err.errorMessage;
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
