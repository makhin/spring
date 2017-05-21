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
import {Customer} from "../models/Customer";
import {InsuranceCaseItem} from "../models/InsuranceCaseItem";
import {MedicalInsuranceCase} from "../models/MedicalInsuranceCase";
import {Localization} from "../Shared/Localization";
import {ErrorHandler} from "app/Shared/ErrorHandler";

@Injectable()
export class DataService {

  constructor(private http: Http, private authService: AuthService) {
  }

  getAllContracts(): Observable<Array<ContractItem>> {
    return this.http.get('api/contracts/', { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => resp.json())
      .map((data: any) => {return <Array<ContractItem>>data;})
      .catch(ErrorHandler.handleError);
  }

  getContract(id: number): Observable<Contract> {
    return this.http.get('api/contracts/' + id)
      .map((resp:Response) => JSON.parse(resp.text(), Localization.reviver))
      .map((data: Contract) => data)
      .catch(ErrorHandler.handleError);
  }

  editContract(contract: Contract) {
    const clone = { ...(new Contract()), ...contract };
    let body = JSON.stringify(clone, Localization.replacer);
    return this.http
      .post('api/contracts/', body, { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => {return;})
      .catch(ErrorHandler.handleError);
  }

  addContract(contract: Contract) {
    const clone = { ...(new Contract()), ...contract };
    let body = JSON.stringify(clone, Localization.replacer);
    return this.http
      .put('api/contracts/', body, { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => JSON.parse(resp.text(), Localization.reviver))
      .map((data: Contract) => data)
      .catch(ErrorHandler.handleError);
  }

  deleteContract(id: number) {
    return this.http.delete('api/contracts/' + id, { headers: this.authService.jsonHeaders() })
      .map((res: Response) => {return;})
      .catch(ErrorHandler.handleError);
  }

  getCustomersByContract(id: number, page?: number, itemsPerPage?: number, filter?: string): Observable<PaginatedResult<CustomerItem[]>> {
    let paginatedResult: PaginatedResult<CustomerItem[]> = new PaginatedResult<CustomerItem[]>();

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
      .map((resp: Response) => JSON.parse(resp.text(), Localization.reviver))
      .map((data: any) => {
        paginatedResult.result = data.items;
        paginatedResult.pagination = new Pagination();
        paginatedResult.pagination.ItemsPerPage = data.pageSize;
        paginatedResult.pagination.CurrentPage = data.pageNumber;
        paginatedResult.pagination.TotalItems = data.totalNumberOfRecords;
        paginatedResult.pagination.TotalPages = data.totalNumberOfPages;
        return paginatedResult;
      })
      .catch(ErrorHandler.handleError);
  }

  getCustomerShort(id: number): Observable<CustomerShort> {
    return this.http.get('api/customers/' + id + '/short')
      .map((resp: Response) => JSON.parse(resp.text(), Localization.reviver))
      .map((data: CustomerShort) => data)
      .catch(ErrorHandler.handleError);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get('api/customers/' + id + '/full')
      .map((resp: Response) => JSON.parse(resp.text(), Localization.reviver))
      .map((data: Customer) => data)
      .catch(ErrorHandler.handleError);
  }

  editCustomer(customer: Customer) {
    const clone = { ...(new Customer()), ...customer };
    let body = JSON.stringify(clone, Localization.replacer);
    return this.http
      .post('api/customers/', body, { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => {return;})
      .catch(ErrorHandler.handleError);
  }

  addCustomer(customer: Customer) {
    const clone = { ...(new Customer()), ...customer };
    let body = JSON.stringify(clone, Localization.replacer);
    return this.http
      .put('api/customers/', body, { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => JSON.parse(resp.text(), Localization.reviver))
      .map((data: Contract) => data)
      .catch(ErrorHandler.handleError);
  }

  deleteCustomer(id: number) {
    return this.http.delete('api/customers/' + id, { headers: this.authService.jsonHeaders() })
      .map((res: Response) => {return;})
      .catch(ErrorHandler.handleError);
  }

  getDepartmentsByContract(id: number, s: string) {
    let options = {
      id: id,
      s: s
    };

    let params = new URLSearchParams();
    for(let key in options){
      params.set(key, options[key])
    }
    return this.http.get('api/customers/departments?' + params.toString(), { headers: this.authService.jsonHeaders() })
      .map((res: Response) => res.json())
      .catch(ErrorHandler.handleError);
  }

  getInsuranceCaseItemsByCustomerId(id: number) : Observable<Array<InsuranceCaseItem>> {
    return this.http.get('api/insurancecases/' + id, {headers: this.authService.jsonHeaders()})
      .map((resp: Response) => resp.json())
      .map((data: any) => {
        return <Array<InsuranceCaseItem>>data;
      })
      .catch(ErrorHandler.handleError);
  }

  getMedicalCase(id: number): Observable<MedicalInsuranceCase> {
  return this.http.get('api/insurancecases/' + id + '/case')
    .map((resp: Response) => JSON.parse(resp.text(), Localization.reviver))
    .map((data: MedicalInsuranceCase) => data)
    .catch(ErrorHandler.handleError);
  }
}
