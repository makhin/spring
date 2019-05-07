import { IHospitalDto } from "./interfaces/IHospitalDto";
import { observable } from "mobx";
export class HospitalDto implements IHospitalDto {
    @observable id?: number;
    @observable parentId?: number | undefined;
    @observable name?: string | undefined;
    constructor(data?: IHospitalDto) {
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
            this.parentId = data["parentId"];
            this.name = data["name"];
        }
    }
    static fromJS(data: any): HospitalDto {
        data = typeof data === 'object' ? data : {};
        let result = new HospitalDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["parentId"] = this.parentId;
        data["name"] = this.name;
        return data;
    }
}
