import { IOrderDto } from "./interfaces/IOrderDto";
import { observable } from "mobx";
export class OrderDto implements IOrderDto {
    @observable id?: number;
    @observable recipeDate?: Date | undefined;
    @observable orderDate?: Date | undefined;
    @observable recipeNumber?: string | undefined;
    @observable orderNumber?: string | undefined;
    @observable pharmacy?: string | undefined;
    @observable amount?: number;
    constructor(data?: IOrderDto) {
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
            this.recipeDate = data["recipeDate"] ? new Date(data["recipeDate"].toString()) : <any>undefined;
            this.orderDate = data["orderDate"] ? new Date(data["orderDate"].toString()) : <any>undefined;
            this.recipeNumber = data["recipeNumber"];
            this.orderNumber = data["orderNumber"];
            this.pharmacy = data["pharmacy"];
            this.amount = data["amount"];
        }
    }
    static fromJS(data: any): OrderDto {
        data = typeof data === 'object' ? data : {};
        let result = new OrderDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["recipeDate"] = this.recipeDate ? this.recipeDate.toISOString() : <any>undefined;
        data["orderDate"] = this.orderDate ? this.orderDate.toISOString() : <any>undefined;
        data["recipeNumber"] = this.recipeNumber;
        data["orderNumber"] = this.orderNumber;
        data["pharmacy"] = this.pharmacy;
        data["amount"] = this.amount;
        return data;
    }
}
