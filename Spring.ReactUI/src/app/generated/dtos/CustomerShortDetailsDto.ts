import { ICustomerShortDetailsDto } from "./interfaces/ICustomerShortDetailsDto";
import { observable } from "mobx";
export class CustomerShortDetailsDto implements ICustomerShortDetailsDto {
    @observable id?: number;
    @observable department?: string | undefined;
    @observable personnelNumber?: string | undefined;
    @observable disabilityGroup?: number;
    @observable mobilePhone?: string | undefined;
    @observable position?: string | undefined;
    constructor(data?: ICustomerShortDetailsDto) {
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
            this.department = data["department"];
            this.personnelNumber = data["personnelNumber"];
            this.disabilityGroup = data["disabilityGroup"];
            this.mobilePhone = data["mobilePhone"];
            this.position = data["position"];
        }
    }
    static fromJS(data: any): CustomerShortDetailsDto {
        data = typeof data === 'object' ? data : {};
        let result = new CustomerShortDetailsDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["department"] = this.department;
        data["personnelNumber"] = this.personnelNumber;
        data["disabilityGroup"] = this.disabilityGroup;
        data["mobilePhone"] = this.mobilePhone;
        data["position"] = this.position;
        return data;
    }
}
