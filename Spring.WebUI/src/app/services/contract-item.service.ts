import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiRequestService} from './api-request.service';
import {ContractItem} from '../models/ContractItem';

@Injectable()
export class ContractItemService {
  private baseUrl = 'api/contracts';  // web api URL
  constructor(private apiRequestService: ApiRequestService) {
    apiRequestService.url = 'api/contracts';
  }

  getAll(): Observable<Array<ContractItem>> {
    return this.apiRequestService.getAll<ContractItem>();
  }
}
