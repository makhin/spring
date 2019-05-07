import { IMkb10Dto } from "./interfaces/IMkb10Dto";
import { observable } from "mobx";
export class Mkb10Dto implements IMkb10Dto {
    @observable id?: number;
    @observable parentId?: number | undefined;
    @observable code?: string | undefined;
    constructor(data?: IMkb10Dto) {
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
            this.code = data["code"];
        }
    }
    static fromJS(data: any): Mkb10Dto {
        data = typeof data === 'object' ? data : {};
        let result = new Mkb10Dto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["parentId"] = this.parentId;
        data["code"] = this.code;
        return data;
    }
}
