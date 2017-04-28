import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContract } from '../models/IContract';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  selectedContract: IContract;
  contracts: IContract[];
  constructor(private contractService: ContractService, private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.contractService.getAll().subscribe((data: Array<IContract>) => {this.contracts = data; });
  }

  onContractDetailEdit(contract: IContract) {
    this.selectedContract = contract;
    console.log('Contract ' + this.selectedContract.id + ' has been clicked: loading ContractDetailComponent...');
    this.router.navigate(['contract', contract.id, 'edit']);
  }
}
