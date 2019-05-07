import { Treatment } from "../enums/Treatment";
import { IInsuranceCaseItemDto } from "./interfaces/IInsuranceCaseItemDto";
import { observable } from "mobx";
export class InsuranceCaseItemDto implements IInsuranceCaseItemDto {
    @observable id?: number;
    @observable mkb10Code?: string | undefined;
    @observable treatment?: Treatment | undefined;
    @observable hospitalName?: string | undefined;
    @observable beginDate?: Date | undefined;
    @observable endDate?: Date | undefined;
    @observable totalAmount?: number | undefined;
    constructor(data?: IInsuranceCaseItemDto) {
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
            this.mkb10Code = data["mkb10Code"];
            this.treatment = data["treatment"];
            this.hospitalName = data["hospitalName"];
            this.beginDate = data["beginDate"] ? new Date(data["beginDate"].toString()) : <any>undefined;
            this.endDate = data["endDate"] ? new Date(data["endDate"].toString()) : <any>undefined;
            this.totalAmount = data["totalAmount"];
        }
    }
    static fromJS(data: any): InsuranceCaseItemDto {
        data = typeof data === 'object' ? data : {};
        let result = new InsuranceCaseItemDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["mkb10Code"] = this.mkb10Code;
        data["treatment"] = this.treatment;
        data["hospitalName"] = this.hospitalName;
        data["beginDate"] = this.beginDate ? this.beginDate.toISOString() : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate.toISOString() : <any>undefined;
        data["totalAmount"] = this.totalAmount;
        return data;
    }
}
