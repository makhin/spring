import { IContractsRepository } from "app/repositories/contracts/IContractsRepository";
import { observable, action } from "mobx";

export class ContractsViewModel {
    private repository: IContractsRepository;
    @observable contract: string;

    constructor(repository: IContractsRepository){
        this.repository = repository;
        this.loadContracts();
    }

    @action
    async loadContracts(){
        const contracts = await this.repository.getAll()
        this.contract = contracts[0].name;
    }
}