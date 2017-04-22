import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ContractService {

private baseUrl = 'api/contracts/';  // web api URL

  constructor(private http: Http) {
  }

  getAll() {
    const url = this.baseUrl;

    return this.http.get(url)
      .map((resp: Response) => resp.json())
      .catch(this.handleError);
  }

  get(id: number) {
    if (id == null) {
      throw new Error('id is required.');
    }
    const url = this.baseUrl + id;
    return this.http.get(url)
      .map((resp: Response) => resp.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    // output errors to the console.
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
