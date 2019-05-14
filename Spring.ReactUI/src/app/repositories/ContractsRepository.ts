import { BaseRepositoryAsync } from "./BaseRepositoryAsync";
import { ContractDto } from "app/generated/dtos/ContractDto";
import { IContractsRepository } from "./contracts/IContractsRepository";

export default class ContractsRepository extends BaseRepositoryAsync implements IContractsRepository{
    constructor(){
        super('Contracts')
    }

    public async getAll(): Promise<ContractDto[] | null>{
        return await super.getAsync<ContractDto[]>('');
    }
}