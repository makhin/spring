import { Treatment } from "../enums/Treatment";
import { Therapy } from "../enums/Therapy";
import { Mkb10Dto } from "../dtos/Mkb10Dto";
import { IInsuranceCaseDto } from "./interfaces/IInsuranceCaseDto";
import { observable } from "mobx";
export abstract class InsuranceCaseDto implements IInsuranceCaseDto {
    @observable id?: number;
    @observable customerId?: number;
    @observable customerName?: string | undefined;
    @observable caseType?: number;
    @observable mkb10?: Mkb10Dto | undefined;
    @observable treatment?: Treatment | undefined;
    @observable therapy?: Therapy | undefined;
    @observable hospitalId?: number | undefined;
    @observable hospitalDepartmentId?: number | undefined;
    @observable beginDate?: Date | undefined;
    @observable endDate?: Date | undefined;
    constructor(data?: IInsuranceCaseDto) {
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
            this.customerId = data["customerId"];
            this.customerName = data["customerName"];
            this.caseType = data["caseType"];
            this.mkb10 = data["mkb10"] ? Mkb10Dto.fromJS(data["mkb10"]) : <any>undefined;
            this.treatment = data["treatment"];
            this.therapy = data["therapy"];
            this.hospitalId = data["hospitalId"];
            this.hospitalDepartmentId = data["hospitalDepartmentId"];
            this.beginDate = data["beginDate"] ? new Date(data["beginDate"].toString()) : <any>undefined;
            this.endDate = data["endDate"] ? new Date(data["endDate"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): InsuranceCaseDto {
        data = typeof data === 'object' ? data : {};
        throw new Error("The abstract class 'InsuranceCaseDto' cannot be instantiated.");
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["customerId"] = this.customerId;
        data["customerName"] = this.customerName;
        data["caseType"] = this.caseType;
        data["mkb10"] = this.mkb10 ? this.mkb10.toJSON() : <any>undefined;
        data["treatment"] = this.treatment;
        data["therapy"] = this.therapy;
        data["hospitalId"] = this.hospitalId;
        data["hospitalDepartmentId"] = this.hospitalDepartmentId;
        data["beginDate"] = this.beginDate ? this.beginDate.toISOString() : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate.toISOString() : <any>undefined;
        return data;
    }
}
