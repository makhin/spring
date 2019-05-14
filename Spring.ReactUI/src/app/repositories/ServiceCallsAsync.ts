import { fetchCallAsync } from "./FetchCalls";

let apiRoot = '/api/';

export class ServiceCallAsync {    
    private apiRoot: string = apiRoot;

    public async GetAsync<TResult>(ctrlAndMethod: string) : Promise<TResult> {
        return this.fetchAsync('GET', ctrlAndMethod)
    }

    private async fetchAsync<TResult>(method: string, ctrlAndMethod: string) : Promise<TResult>{
        const response = await fetchCallAsync(this.apiRoot + ctrlAndMethod, method, this.getHeaders(), null);
        return await response.json() as TResult;
    }

    private getHeaders(): any {
        const headers: any = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache",
            Expiries: 'Thu, 01 Jun 2017 10:00:00 GMT',
            Pragma: 'no-cache'            
        }

        return headers;
    }
}

export default new ServiceCallAsync();