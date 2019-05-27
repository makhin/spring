import { BaseRepositoryAsync } from "./BaseRepositoryAsync";
import { ContractDto } from "app/generated/dtos/ContractDto";
import { IContractsRepository } from "./contracts/IContractsRepository";
import { REPO_CONTRACTS } from "app/constants";

export default class ContractsRepository extends BaseRepositoryAsync implements IContractsRepository{
    constructor(){
        super(REPO_CONTRACTS)
    }

    public async getAll(): Promise<ContractDto[] | null>{
        return await super.getAsync<ContractDto[]>('');
    }
}