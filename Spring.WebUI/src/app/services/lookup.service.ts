import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Injectable, OnInit} from '@angular/core';
import {Http, Response, Headers, URLSearchParams} from '@angular/http';
import {AuthService} from "../Shared/auth.service";
import {SelectItem} from "primeng/dist/components/common/api";
import {ErrorHandler} from "../Shared/ErrorHandler";

@Injectable()
export class LookupService implements OnInit  {
  therapy: SelectItem[];
  threatments: SelectItem[];

  constructor(private http: Http, private authService: AuthService) {
  }

  ngOnInit() {

  }

  getTherapy(): SelectItem[] {
    if (this.therapy) {
      return this.therapy;
    }
    this.http.get('api/lookup/therapy', {headers: this.authService.jsonHeaders()})
      .map((resp: Response) => resp.json())
      .map((data: any) => {
        this.therapy = [];
        for (let item of data) {
          this.therapy.push({label: item, value: item});
        }
      }).catch(ErrorHandler.handleError).subscribe(
      () => {
        return this.therapy
      });
  }

  getThreatment(): SelectItem[] {
    if (this.threatments) {
      return this.threatments;
    }
    this.http.get('api/lookup/threatment', {headers: this.authService.jsonHeaders()})
      .map((resp: Response) => resp.json())
      .map((data: any) => {
        this.threatments = [];
        for (let item of data) {
          this.threatments.push({label: item, value: item});
        }
      })
      .catch(ErrorHandler.handleError)
      .subscribe(() => {
        return this.threatments
      });
  }

  getMkb10(s: string) {
    return this.http.get('api/lookup/' + s + '/mkb10', {headers: this.authService.jsonHeaders()})
      .map((res: Response) => res.json())
      .catch(ErrorHandler.handleError);
  }
}
