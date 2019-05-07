import { InsuranceCaseItemDto } from "../InsuranceCaseItemDto";
export interface ICustomerInsuranceCasesDto {
    id?: number;
    name?: string | undefined;
    contractId?: number;
    insuranceCases?: InsuranceCaseItemDto[] | undefined;
}
