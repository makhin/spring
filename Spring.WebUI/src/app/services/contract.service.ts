import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Contract } from '../models/Contract';
import {ApiRequestService} from './api-request.service';

@Injectable()
export class ContractService extends ApiRequestService<Contract> {

  private baseUrl = 'api/contracts/';  // web api URL

  getAll() {
    this.url = this.baseUrl;
    return super.getAll();
  }

  get(id: number) {
  }

  addContract(contract: Contract) {
  }

  editContract(contract: Contract) {
  }

  deleteContract(id: number) {
  }
}
