import { Treatment } from "../../enums/Treatment";
import { Therapy } from "../../enums/Therapy";
import { Mkb10Dto } from "../Mkb10Dto";
export interface IInsuranceCaseDto {
    id?: number;
    customerId?: number;
    customerName?: string | undefined;
    caseType?: number;
    mkb10?: Mkb10Dto | undefined;
    treatment?: Treatment | undefined;
    therapy?: Therapy | undefined;
    hospitalId?: number | undefined;
    hospitalDepartmentId?: number | undefined;
    beginDate?: Date | undefined;
    endDate?: Date | undefined;
}
