import { throwException } from "../SwaggerException";
import { CustomerShortDetailsDto } from "../dtos/CustomerShortDetailsDto";
import { CustomerInsuranceCasesDto } from "../dtos/CustomerInsuranceCasesDto";
import { CustomerDto } from "../dtos/CustomerDto";
import { ProblemDetails } from "../ProblemDetails";
export class CustomersClient {
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
    getByContractId(id: number | undefined, page: number | undefined, pageSize: number | undefined, globalFilter: string | null | undefined, contract: string): Promise<CustomerDto[] | null> {
        let url_ = this.baseUrl + "/api/Customers/{contract}?";
        if (contract === undefined || contract === null)
            throw new Error("The parameter 'contract' must be defined.");
        url_ = url_.replace("{contract}", encodeURIComponent("" + contract));
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        if (page === null)
            throw new Error("The parameter 'page' cannot be null.");
        else if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        if (pageSize === null)
            throw new Error("The parameter 'pageSize' cannot be null.");
        else if (pageSize !== undefined)
            url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&";
        if (globalFilter !== undefined)
            url_ += "globalFilter=" + encodeURIComponent("" + globalFilter) + "&";
        url_ = url_.replace(/[?&]$/, "");
        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetByContractId(_response);
        });
    }
    protected processGetByContractId(response: Response): Promise<CustomerDto[] | null> {
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
                        result200!.push(CustomerDto.fromJS(item));
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
        return Promise.resolve<CustomerDto[] | null>(<any>null);
    }
    getByCustomerId(id: number): Promise<CustomerInsuranceCasesDto[] | null> {
        let url_ = this.baseUrl + "/api/Customers/{id}/cases";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");
        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetByCustomerId(_response);
        });
    }
    protected processGetByCustomerId(response: Response): Promise<CustomerInsuranceCasesDto[] | null> {
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
                        result200!.push(CustomerInsuranceCasesDto.fromJS(item));
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
        return Promise.resolve<CustomerInsuranceCasesDto[] | null>(<any>null);
    }
    getShortDetails(id: number): Promise<CustomerShortDetailsDto | null> {
        let url_ = this.baseUrl + "/api/Customers/{id}/short";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");
        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetShortDetails(_response);
        });
    }
    protected processGetShortDetails(response: Response): Promise<CustomerShortDetailsDto | null> {
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
                result200 = resultData200 ? CustomerShortDetailsDto.fromJS(resultData200) : <any>null;
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
        return Promise.resolve<CustomerShortDetailsDto | null>(<any>null);
    }
    getById(id: number): Promise<CustomerDto | null> {
        let url_ = this.baseUrl + "/api/Customers/{id}/full";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");
        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetById(_response);
        });
    }
    protected processGetById(response: Response): Promise<CustomerDto | null> {
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
                result200 = resultData200 ? CustomerDto.fromJS(resultData200) : <any>null;
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
        return Promise.resolve<CustomerDto | null>(<any>null);
    }
    getDepartmentsByContract(id: number | undefined, s: string | null | undefined): Promise<string[] | null> {
        let url_ = this.baseUrl + "/api/Customers/departments?";
        if (id === null)
            throw new Error("The parameter 'id' cannot be null.");
        else if (id !== undefined)
            url_ += "id=" + encodeURIComponent("" + id) + "&";
        if (s !== undefined)
            url_ += "s=" + encodeURIComponent("" + s) + "&";
        url_ = url_.replace(/[?&]$/, "");
        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetDepartmentsByContract(_response);
        });
    }
    protected processGetDepartmentsByContract(response: Response): Promise<string[] | null> {
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
                        result200!.push(item);
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
        return Promise.resolve<string[] | null>(<any>null);
    }
    put(value: CustomerDto): Promise<CustomerDto | null> {
        let url_ = this.baseUrl + "/api/Customers";
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify(value);
        let options_ = <RequestInit>{
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPut(_response);
        });
    }
    protected processPut(response: Response): Promise<CustomerDto | null> {
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
                result200 = resultData200 ? CustomerDto.fromJS(resultData200) : <any>null;
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
        return Promise.resolve<CustomerDto | null>(<any>null);
    }
    post(value: CustomerDto): Promise<void> {
        let url_ = this.baseUrl + "/api/Customers";
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify(value);
        let options_ = <RequestInit>{
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPost(_response);
        });
    }
    protected processPost(response: Response): Promise<void> {
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
    delete(id: number): Promise<void> {
        let url_ = this.baseUrl + "/api/Customers/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");
        let options_ = <RequestInit>{
            method: "DELETE",
            headers: {}
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
}
