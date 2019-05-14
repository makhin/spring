import { ContractDto } from "app/generated/dtos/ContractDto";

export interface IContractsRepository {
    getAll(): Promise<ContractDto[] | null>
}