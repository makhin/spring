import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import {Contract} from "app/models/Contract";
import {AuthService} from "../Shared/auth.service";
import {ContractItem} from "../models/ContractItem";
import {CustomerItem} from "../models/CustomerItem";
import {PaginatedResult, Pagination} from "../models/Pagination";
import {CustomerShort} from "../models/CustomerShort";

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

  getCustomersByContract(id: number, page?: number, itemsPerPage?: number, filter?: string): Observable<PaginatedResult<CustomerItem[]>> {
    var paginatedResult: PaginatedResult<CustomerItem[]> = new PaginatedResult<CustomerItem[]>();

    let options = {
      id: id,
      page: page,
      pageSize: itemsPerPage,
      globalFilter: filter
    };

    let params = new URLSearchParams();
    for(let key in options){
      params.set(key, options[key])
    }

    return this.http.get('api/customers/contract?' + params.toString(), { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => JSON.parse(resp.text(), this.reviver))
      .map((data: any) => {
        paginatedResult.result = data.items;
        paginatedResult.pagination = new Pagination();
        paginatedResult.pagination.ItemsPerPage = data.pageSize;
        paginatedResult.pagination.CurrentPage = data.pageNumber;
        paginatedResult.pagination.TotalItems = data.totalNumberOfRecords;
        paginatedResult.pagination.TotalPages = data.totalNumberOfPages;
        return paginatedResult;
      })
      .catch(this.handleError);
  }

  getCustomerShort(id: number): Observable<CustomerShort> {
    return this.http.get('api/customers/' + id + '/short')
      .map((resp: Response) => JSON.parse(resp.text(), this.reviver))
      .map((data: CustomerShort) => data)
      .catch(this.handleError);
  }

  reviver(key, value): any {
    var datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    if (typeof value === "string" && datePattern.test(value)) {
      let d = new Date(value);
      let date = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
      return date;
    }

    return value;
  }

  replacer(key, value): any {
    if (typeof(value) === 'object') {
      for (var k in value) {
        if (value[k] != null && value[k] instanceof Date) {
          var d = value[k];
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
