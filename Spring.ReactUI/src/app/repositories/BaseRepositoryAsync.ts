import  ServiceCallAsync from "./ServiceCallsAsync";

export abstract class BaseRepositoryAsync {
    protected controllerName: string;

    constructor(controllerName: string) {
        this.controllerName = controllerName;
    }

    protected async getAsync<TResult>(method: string): Promise<TResult> {
        return await ServiceCallAsync.GetAsync<TResult>(this.controllerName + method)
    }
}