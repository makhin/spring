import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { Contract } from '../models/Contract';
import { AuthService } from '../security/auth.service';

@Injectable()
export class ContractService {

  private baseUrl = 'api/contracts/';  // web api URL
  private static handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  constructor(private http: Http, private authService: AuthService) {
  }

  getAll() {
    const url = this.baseUrl;

    return this.http.get(url)
      .map((resp: Response) => resp.json())
      .catch(ContractService.handleError);
  }

  get(id: number) {
    if (id == null) {
      throw new Error('id is required.');
    }
    const url = this.baseUrl + id;
    return this.http.get(url, { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => resp.json())
      .catch(ContractService.handleError);
  }

  addContract(contract: Contract) {
    const url = this.baseUrl;
    return this.http
      .post(url, JSON.stringify(contract), { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => resp.json())
      .catch(ContractService.handleError);
  }

  editContract(contract: Contract) {
    const url = this.baseUrl;
    return this.http
      .put(url, JSON.stringify(contract), { headers: this.authService.jsonHeaders() })
      .map((resp: Response) => resp.json())
      .catch(ContractService.handleError);
  }

  deleteContract(id: number) {
    const url = this.baseUrl;
    return this.http.delete(url + '/' + id, { headers: this.authService.jsonHeaders() })
      .map((res: Response) => res.json())
      .catch(ContractService.handleError);
  }
}
