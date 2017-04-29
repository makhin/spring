import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Contract } from '../models/Contract';
import {ApiRequestService} from './api-request.service';

@Injectable()
export class ContractService extends ApiRequestService<Contract> {

  private baseUrl = 'api/contracts';  // web api URL

  getById(id: number): Observable<Contract> {
    this.url = this.baseUrl;
    //noinspection TypeScriptValidateTypes
    return super.getById(id);
  }

  addContract(contract: Contract) {
    this.url = this.baseUrl;
    return super.addEntity(contract);
  }

  editContract(contract: Contract) {
    this.url = this.baseUrl;
    return super.editEntity(contract);
  }

  deleteContract(id: number) {
    this.url = this.baseUrl;
    return super.deleteEntity(id);
  }
}
