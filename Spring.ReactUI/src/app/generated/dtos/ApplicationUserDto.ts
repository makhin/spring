import { IApplicationUserDto } from "./interfaces/IApplicationUserDto";
import { observable } from "mobx";

export class ApplicationUserDto implements IApplicationUserDto {
@observable email?: string | undefined;
@observable password?: string | undefined;
@observable firstName?: string | undefined;
@observable lastName?: string | undefined;
@observable isAdmin?: boolean;
@observable isUser?: boolean;
    constructor(data?: IApplicationUserDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }
    init(data?: any) {
        if (data) {
            this.email = data["email"];
            this.password = data["password"];
            this.firstName = data["firstName"];
            this.lastName = data["lastName"];
            this.isAdmin = data["isAdmin"];
            this.isUser = data["isUser"];
        }
    }
    static fromJS(data: any): ApplicationUserDto {
        data = typeof data === 'object' ? data : {};
        let result = new ApplicationUserDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["email"] = this.email;
        data["password"] = this.password;
        data["firstName"] = this.firstName;
        data["lastName"] = this.lastName;
        data["isAdmin"] = this.isAdmin;
        data["isUser"] = this.isUser;
        return data;
    }
}
