import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class JsonHeaderService {

    constructor() { }
    // for requesting unsecured data using json
    jsonHeaders() {
      const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Accept', 'application/json');
        return header;
    }

    // for requesting unsecured data using form post
    contentHeaders() {
      const header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Accept', 'application/json');
        return header;
    }
}
