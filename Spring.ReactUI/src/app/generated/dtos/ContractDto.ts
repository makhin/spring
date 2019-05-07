import { IContractDto } from "./interfaces/IContractDto";
import { observable } from "mobx";
export class ContractDto implements IContractDto {
    @observable id?: number;
    @observable name?: string | undefined;
    @observable code?: string | undefined;
    @observable description?: string | undefined;
    @observable beginDate?: Date;
    @observable endDate?: Date;
    @observable isActive?: boolean;
    constructor(data?: IContractDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.name = data["name"];
            this.code = data["code"];
            this.description = data["description"];
            this.beginDate = data["beginDate"] ? new Date(data["beginDate"].toString()) : <any>undefined;
            this.endDate = data["endDate"] ? new Date(data["endDate"].toString()) : <any>undefined;
            this.isActive = data["isActive"];
        }
    }
    static fromJS(data: any): ContractDto {
        data = typeof data === 'object' ? data : {};
        let result = new ContractDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["code"] = this.code;
        data["description"] = this.description;
        data["beginDate"] = this.beginDate ? this.beginDate.toISOString() : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate.toISOString() : <any>undefined;
        data["isActive"] = this.isActive;
        return data;
    }
}
