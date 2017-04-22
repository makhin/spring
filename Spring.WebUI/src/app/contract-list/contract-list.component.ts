import { Component, OnInit } from '@angular/core';
import { IContract } from '../models/IContract';
import { ViewModelResponse } from '../models/ViewModelResponse';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  selectedContract: IContract;
  contracts: IContract[];
  errorMessage: string;

  constructor(private contractService: ContractService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.contractService.getAll()
      .subscribe((data: ViewModelResponse) => {
          if (data != null && data.statusCode === 200) {
            this.contracts = data.value;
          }
        },
        (error: any) => {
          this.errorMessage = JSON.stringify(<any>error);
        });
  }

  onSelect(contract: IContract) {
    this.selectedContract = contract;
    console.log('item with Id ' + this.selectedContract.id + ' has been selected.');
  }
}
