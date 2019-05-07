import { InsuranceCaseDto } from "./InsuranceCaseDto";
import { OrderDto } from "./OrderDto";
import { IMedicalInsuranceCaseDto } from "./interfaces/IMedicalInsuranceCaseDto";
import { observable } from "mobx";
export class MedicalInsuranceCaseDto extends InsuranceCaseDto implements IMedicalInsuranceCaseDto {
    @observable reportDate?: Date | undefined;
    @observable documentDate?: Date | undefined;
    @observable diagnosisCosts?: number | undefined;
    @observable foodCosts?: number | undefined;
    @observable treatmentСosts?: number | undefined;
    @observable orders?: OrderDto[] | undefined;
    constructor(data?: IMedicalInsuranceCaseDto) {
        super(data);
    }
    init(data?: any) {
        super.init(data);
        if (data) {
            this.reportDate = data["reportDate"] ? new Date(data["reportDate"].toString()) : <any>undefined;
            this.documentDate = data["documentDate"] ? new Date(data["documentDate"].toString()) : <any>undefined;
            this.diagnosisCosts = data["diagnosisCosts"];
            this.foodCosts = data["foodCosts"];
            this.treatmentСosts = data["treatmentСosts"];
            if (data["orders"] && data["orders"].constructor === Array) {
                this.orders = [] as any;
                for (let item of data["orders"])
                    this.orders!.push(OrderDto.fromJS(item));
            }
        }
    }
    static fromJS(data: any): MedicalInsuranceCaseDto {
        data = typeof data === 'object' ? data : {};
        let result = new MedicalInsuranceCaseDto();
        result.init(data);
        return result;
    }
    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["reportDate"] = this.reportDate ? this.reportDate.toISOString() : <any>undefined;
        data["documentDate"] = this.documentDate ? this.documentDate.toISOString() : <any>undefined;
        data["diagnosisCosts"] = this.diagnosisCosts;
        data["foodCosts"] = this.foodCosts;
        data["treatmentСosts"] = this.treatmentСosts;
        if (this.orders && this.orders.constructor === Array) {
            data["orders"] = [];
            for (let item of this.orders)
                data["orders"].push(item.toJSON());
        }
        super.toJSON(data);
        return data;
    }
}
