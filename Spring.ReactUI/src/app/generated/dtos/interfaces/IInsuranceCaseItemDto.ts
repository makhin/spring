import { Treatment } from "../../enums/Treatment";
export interface IInsuranceCaseItemDto {
    id?: number;
    mkb10Code?: string | undefined;
    treatment?: Treatment | undefined;
    hospitalName?: string | undefined;
    beginDate?: Date | undefined;
    endDate?: Date | undefined;
    totalAmount?: number | undefined;
}
