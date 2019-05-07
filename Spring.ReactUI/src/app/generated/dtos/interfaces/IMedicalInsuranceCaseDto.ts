import { IInsuranceCaseDto } from "./IInsuranceCaseDto";
import { OrderDto } from "../OrderDto";
export interface IMedicalInsuranceCaseDto extends IInsuranceCaseDto {
    reportDate?: Date | undefined;
    documentDate?: Date | undefined;
    diagnosisCosts?: number | undefined;
    foodCosts?: number | undefined;
    treatmentСosts?: number | undefined;
    orders?: OrderDto[] | undefined;
}
