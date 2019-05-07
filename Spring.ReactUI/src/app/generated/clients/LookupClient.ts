import { throwException } from "../SwaggerException";
import { HospitalDto } from "../dtos/HospitalDto";
import { Mkb10Dto } from "../dtos/Mkb10Dto";
export class LookupClient {
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
    getTherapy(): Promise<string[] | null> {
        let url_ = this.baseUrl + "/api/Lookup/therapy";
        url_ = url_.replace(/[?&]$/, "");
        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetTherapy(_response);
        });
    }
    protected processGetTherapy(response: Response): Promise<string[] | null> {
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
    getTreatments(): Promise<string[] | null> {
        let url_ = this.baseUrl + "/api/Lookup/treatment";
        url_ = url_.replace(/[?&]$/, "");
        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetTreatments(_response);
        });
    }
    protected processGetTreatments(response: Response): Promise<string[] | null> {
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
    getHospitals(id: number | null): Promise<HospitalDto[] | null> {
        let url_ = this.baseUrl + "/api/Lookup/{id}/hospital";
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
            return this.processGetHospitals(_response);
        });
    }
    protected processGetHospitals(response: Response): Promise<HospitalDto[] | null> {
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
                        result200!.push(HospitalDto.fromJS(item));
                }
                return result200;
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
        return Promise.resolve<HospitalDto[] | null>(<any>null);
    }
    getMkb10(s: string | null): Promise<Mkb10Dto[] | null> {
        let url_ = this.baseUrl + "/api/Lookup/{s}/mkb10";
        if (s === undefined || s === null)
            throw new Error("The parameter 's' must be defined.");
        url_ = url_.replace("{s}", encodeURIComponent("" + s));
        url_ = url_.replace(/[?&]$/, "");
        let options_ = <RequestInit>{
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetMkb10(_response);
        });
    }
    protected processGetMkb10(response: Response): Promise<Mkb10Dto[] | null> {
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
                        result200!.push(Mkb10Dto.fromJS(item));
                }
                return result200;
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
        return Promise.resolve<Mkb10Dto[] | null>(<any>null);
    }
}
