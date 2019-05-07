import { throwException } from "../SwaggerException";
import { ApplicationUserDto } from "../dtos/ApplicationUserDto";
import { ProblemDetails } from "../ProblemDetails";
export class IdentityClient {
    private http: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;
    constructor(baseUrl?: string, http?: {
        fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
    }) {
        this.http = http ? http : <any>window;
        this.baseUrl = baseUrl ? baseUrl : "";
    }
    getAll(): Promise<ApplicationUserDto[] | null> {
        let url_ = this.baseUrl + "/api/Identity/GetAll";
        url_ = url_.replace(/[?&]$/, "");
        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetAll(_response);
        });
    }
    protected processGetAll(response: Response): Promise<ApplicationUserDto[] | null> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        }
        ;
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                if (resultData200 && resultData200.constructor === Array) {
                    result200 = [] as any;
                    for (let item of resultData200)
                        result200!.push(ApplicationUserDto.fromJS(item));
                }
                return result200;
            });
        }
        else if (status === 204) {
            return response.text().then((_responseText) => {
                return throwException("A server error occurred.", status, _responseText, _headers);
            });
        }
        else if (status === 500) {
            return response.text().then((_responseText) => {
                return throwException("A server error occurred.", status, _responseText, _headers);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ApplicationUserDto[] | null>(<any>null);
    }
    create(dto: ApplicationUserDto): Promise<void> {
        let url_ = this.baseUrl + "/api/Identity";
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify(dto);
        let options_ = <RequestInit>{
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCreate(_response);
        });
    }
    protected processCreate(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        }
        ;
        if (status === 200) {
            return response.text().then((_responseText) => {
                return;
            });
        }
        else if (status === 400) {
            return response.text().then((_responseText) => {
                let result400: any = null;
                let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result400 = resultData400 ? ProblemDetails.fromJS(resultData400) : <any>null;
                return throwException("A server error occurred.", status, _responseText, _headers, result400);
            });
        }
        else if (status === 500) {
            return response.text().then((_responseText) => {
                return throwException("A server error occurred.", status, _responseText, _headers);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(<any>null);
    }
    delete(username: string): Promise<void> {
        let url_ = this.baseUrl + "/api/Identity";
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify(username);
        let options_ = <RequestInit>{
            body: content_,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDelete(_response);
        });
    }
    protected processDelete(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        }
        ;
        if (status === 200) {
            return response.text().then((_responseText) => {
                return;
            });
        }
        else if (status === 404) {
            return response.text().then((_responseText) => {
                let result404: any = null;
                let resultData404 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result404 = resultData404 ? ProblemDetails.fromJS(resultData404) : <any>null;
                return throwException("A server error occurred.", status, _responseText, _headers, result404);
            });
        }
        else if (status === 500) {
            return response.text().then((_responseText) => {
                return throwException("A server error occurred.", status, _responseText, _headers);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(<any>null);
    }
    update(dto: ApplicationUserDto): Promise<ApplicationUserDto | null> {
        let url_ = this.baseUrl + "/api/Identity";
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify(dto);
        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUpdate(_response);
        });
    }
    protected processUpdate(response: Response): Promise<ApplicationUserDto | null> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v: any, k: any) => _headers[k] = v);
        }
        ;
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 ? ApplicationUserDto.fromJS(resultData200) : <any>null;
                return result200;
            });
        }
        else if (status === 400) {
            return response.text().then((_responseText) => {
                let result400: any = null;
                let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result400 = resultData400 ? ProblemDetails.fromJS(resultData400) : <any>null;
                return throwException("A server error occurred.", status, _responseText, _headers, result400);
            });
        }
        else if (status === 500) {
            return response.text().then((_responseText) => {
                return throwException("A server error occurred.", status, _responseText, _headers);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ApplicationUserDto | null>(<any>null);
    }
}
