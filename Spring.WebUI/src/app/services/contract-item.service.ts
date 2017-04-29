import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ApiRequestService} from './api-request.service';
import {ContractItem} from '../models/ContractItem';

@Injectable()
export class ContractItemService extends ApiRequestService<ContractItem> {

  private baseUrl = 'api/contracts';  // web api URL

  getAll(): Observable<Array<ContractItem>> {
    this.url = this.baseUrl;
    //noinspection TypeScriptValidateTypes
    return super.getAll();
  }
}
