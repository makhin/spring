import { ICustomerDto } from "./interfaces/ICustomerDto";
import { observable } from "mobx";
export class CustomerDto implements ICustomerDto {
    @observable id?: number;
    @observable contractId?: number;
    @observable name?: string | undefined;
    @observable dateOfBirth?: Date | undefined;
    @observable tin?: string | undefined;
    @observable department?: string | undefined;
    @observable personnelNumber?: string | undefined;
    @observable disabilityGroup?: number | undefined;
    @observable mobilePhone?: string | undefined;
    @observable position?: string | undefined;
    @observable additionalInfo?: string | undefined;
    @observable cardNumber?: string | undefined;
    @observable address?: string | undefined;
    @observable sex?: boolean | undefined;
    @observable passport?: string | undefined;
    @observable startDate?: Date;
    @observable endDate?: Date | undefined;
    constructor(data?: ICustomerDto) {
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
            this.contractId = data["contractId"];
            this.name = data["name"];
            this.dateOfBirth = data["dateOfBirth"] ? new Date(data["dateOfBirth"].toString()) : <any>undefined;
            this.tin = data["tin"];
            this.department = data["department"];
            this.personnelNumber = data["personnelNumber"];
            this.disabilityGroup = data["disabilityGroup"];
            this.mobilePhone = data["mobilePhone"];
            this.position = data["position"];
            this.additionalInfo = data["additionalInfo"];
            this.cardNumber = data["cardNumber"];
            this.address = data["address"];
            this.sex = data["sex"];
            this.passport = data["passport"];
            this.startDate = data["startDate"] ? new Date(data["startDate"].toString()) : <any>undefined;
            this.endDate = data["endDate"] ? new Date(data["endDate"].toString()) : <any>undefined;
        }
    }
    static fromJS(data: any): CustomerDto {
        data = typeof data === 'object' ? data : {};
        let result = new CustomerDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["contractId"] = this.contractId;
        data["name"] = this.name;
        data["dateOfBirth"] = this.dateOfBirth ? this.dateOfBirth.toISOString() : <any>undefined;
        data["tin"] = this.tin;
        data["department"] = this.department;
        data["personnelNumber"] = this.personnelNumber;
        data["disabilityGroup"] = this.disabilityGroup;
        data["mobilePhone"] = this.mobilePhone;
        data["position"] = this.position;
        data["additionalInfo"] = this.additionalInfo;
        data["cardNumber"] = this.cardNumber;
        data["address"] = this.address;
        data["sex"] = this.sex;
        data["passport"] = this.passport;
        data["startDate"] = this.startDate ? this.startDate.toISOString() : <any>undefined;
        data["endDate"] = this.endDate ? this.endDate.toISOString() : <any>undefined;
        return data;
    }
}
