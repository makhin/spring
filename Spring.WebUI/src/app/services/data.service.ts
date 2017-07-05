import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Response, URLSearchParams} from '@angular/http';
import {Contract} from "app/models/Contract";
import {ContractItem} from "../models/ContractItem";
import {CustomerItem} from "../models/CustomerItem";
import {PaginatedResult, Pagination} from "../models/Pagination";
import {CustomerShort} from "../models/CustomerShort";
import {Customer} from "../models/Customer";
import {InsuranceCaseItem} from "../models/InsuranceCaseItem";
import {InsuranceCase, MedicalInsuranceCase} from "../models/InsuranceCase";
import {Localization} from "../Shared/Localization";
import {ErrorHandler} from "app/Shared/ErrorHandler";
import {AuthHttp} from "angular2-jwt";
import {JsonHeaderService} from "../Shared/jsonHeader.service";
import {CustomerInsuranceCases} from "../models/CustomerInsuranceCases";

@Injectable()
export class DataService {

  constructor(private authHttp: AuthHttp, private jsonHeader: JsonHeaderService) {
  }

  getAllContracts(): Observable<Array<ContractItem>> {
    return this.authHttp.get('api/contracts/', this.jsonHeader.jsonHeaders())
      .map((resp: Response) => resp.json())
      .map((data: any) => <Array<ContractItem>>data)
      .catch((error: any) =>
        {
          console.log(error);
          return Observable.throw(error);
        }
      );
  }

  getContract(id: number): Observable<Contract> {
    return this.authHttp.get('api/contracts/' + id, this.jsonHeader.jsonHeaders())
      .map((resp:Response) => JSON.parse(resp.text(), Localization.reviver))
      .map((data: Contract) => data)
      .catch(ErrorHandler.handleError);
  }

  editContract(contract: Contract) {
    const clone = { ...(new Contract()), ...contract };
    let body = JSON.stringify(clone, Localization.replacer);
    return this.authHttp
      .post('api/contracts/', body, this.jsonHeader.jsonHeaders())
      .map((resp: Response) => {return;})
      .catch(ErrorHandler.handleError);
  }

  addContract(contract: Contract) {
    const clone = { ...(new Contract()), ...contract };
    let body = JSON.stringify(clone, Localization.replacer);
    return this.authHttp
      .put('api/contracts/', body, this.jsonHeader.jsonHeaders())
      .map((resp: Response) => JSON.parse(resp.text(), Localization.reviver))
      .map((data: Contract) => data)
      .catch(ErrorHandler.handleError);
  }

  deleteContract(id: number) {
    return this.authHttp.delete('api/contracts/' + id, this.jsonHeader.jsonHeaders())
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

    return this.authHttp.get('api/customers/contract?' + params.toString(), this.jsonHeader.jsonHeaders())
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
    return this.authHttp.get('api/customers/' + id + '/short', this.jsonHeader.jsonHeaders())
      .map((resp: Response) => JSON.parse(resp.text(), Localization.reviver))
      .map((data: CustomerShort) => data)
      .catch(ErrorHandler.handleError);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.authHttp.get('api/customers/' + id + '/full', this.jsonHeader.jsonHeaders())
      .map((resp: Response) => JSON.parse(resp.text(), Localization.reviver))
      .map((data: Customer) => data)
      .catch(ErrorHandler.handleError);
  }

  editCustomer(customer: Customer) {
    const clone = { ...(new Customer()), ...customer };
    let body = JSON.stringify(clone, Localization.replacer);
    return this.authHttp
      .post('api/customers/', body, this.jsonHeader.jsonHeaders())
      .map((resp: Response) => {return;})
      .catch(ErrorHandler.handleError);
  }

  addCustomer(customer: Customer) {
    const clone = { ...(new Customer()), ...customer };
    let body = JSON.stringify(clone, Localization.replacer);
    return this.authHttp
      .put('api/customers/', body, this.jsonHeader.jsonHeaders())
      .map((resp: Response) => JSON.parse(resp.text(), Localization.reviver))
      .map((data: Contract) => data)
      .catch(ErrorHandler.handleError);
  }

  deleteCustomer(id: number) {
    return this.authHttp.delete('api/customers/' + id, this.jsonHeader.jsonHeaders())
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
    return this.authHttp.get('api/customers/departments?' + params.toString(), this.jsonHeader.jsonHeaders())
      .map((res: Response) => res.json())
      .catch((error: any) =>
        {
          console.log(error);
          return Observable.throw(error);
        }
      );
  }

  getInsuranceCaseItemsByCustomerId(id: number): Observable<CustomerInsuranceCases> {
    return this.authHttp.get('api/customers/' + id + '/cases', this.jsonHeader.jsonHeaders())
      .map((resp: Response) => resp.json())
      .map((data: any) => {
        return data;
      })
      .catch(ErrorHandler.handleError);
  }

  getInsuranceCase(id: number): Observable<InsuranceCase> {
  return this.authHttp.get('api/insurancecases/' + id + '/full', this.jsonHeader.jsonHeaders())
    .map((resp: Response) => JSON.parse(resp.text(), Localization.reviver))
    .map((data: InsuranceCase) => data)
    .catch(ErrorHandler.handleError);
  }

  editMedicalInsuranceCase(medicalInsuranceCase: MedicalInsuranceCase) {
    const clone = { ...(new MedicalInsuranceCase()), ...medicalInsuranceCase };
    let body = JSON.stringify(clone, Localization.replacer);
    return this.authHttp
      .post('api/insurancecases/medical', body, this.jsonHeader.jsonHeaders())
      .map((resp: Response) => {return;})
      .catch(ErrorHandler.handleError);
  }

  addMedicalInsuranceCase(medicalInsuranceCase: MedicalInsuranceCase) {
    const clone = { ...(new MedicalInsuranceCase()), ...medicalInsuranceCase };
    let body = JSON.stringify(clone, Localization.replacer);
    return this.authHttp
      .put('api/insurancecases/medical', body, this.jsonHeader.jsonHeaders())
      .map((resp: Response) => JSON.parse(resp.text(), Localization.reviver))
      .map((data: Contract) => data)
      .catch(ErrorHandler.handleError);
  }
}
