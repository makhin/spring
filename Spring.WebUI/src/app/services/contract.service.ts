import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Contract } from '../models/Contract';
import {ApiRequestService} from './api-request.service';

@Injectable()
export class ContractService {
  constructor(private apiRequestService: ApiRequestService) {
    apiRequestService.url = 'api/contracts';
  }

  getById(id: number): Observable<Contract> {
    return this.apiRequestService.getById<Contract>(id);
  }

  addContract(contract: Contract) {
    return this.apiRequestService.addEntity<Contract>(contract);
  }

  editContract(contract: Contract) {
    return this.apiRequestService.editEntity<Contract>(contract);
  }

  deleteContract(id: number) {
    return this.apiRequestService.deleteEntity<Contract>(id);
  }
}
