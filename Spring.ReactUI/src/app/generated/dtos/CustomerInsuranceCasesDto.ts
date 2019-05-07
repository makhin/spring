import { InsuranceCaseItemDto } from "./InsuranceCaseItemDto";
import { ICustomerInsuranceCasesDto } from "./interfaces/ICustomerInsuranceCasesDto";
import { observable } from "mobx";
export class CustomerInsuranceCasesDto implements ICustomerInsuranceCasesDto {
    @observable id?: number;
    @observable name?: string | undefined;
    @observable contractId?: number;
    @observable insuranceCases?: InsuranceCaseItemDto[] | undefined;
    constructor(data?: ICustomerInsuranceCasesDto) {
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
            this.contractId = data["contractId"];
            if (data["insuranceCases"] && data["insuranceCases"].constructor === Array) {
                this.insuranceCases = [] as any;
                for (let item of data["insuranceCases"])
                    this.insuranceCases!.push(InsuranceCaseItemDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): CustomerInsuranceCasesDto {
        data = typeof data === 'object' ? data : {};
        let result = new CustomerInsuranceCasesDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["contractId"] = this.contractId;
        if (this.insuranceCases && this.insuranceCases.constructor === Array) {
            data["insuranceCases"] = [];
            for (let item of this.insuranceCases)
                data["insuranceCases"].push(item.toJSON());
        }
        return data;
    }
}
