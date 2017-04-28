import { Component, OnInit } from '@angular/core';
import { Contract } from '../models/Contract';
import {Router, ActivatedRoute} from '@angular/router';
import { ContractService } from '../services/contract.service';
import { ViewModelResponse } from '../models/ViewModelResponse';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail-edit.component.html',
  styleUrls: ['./contract-detail-edit.component.css']
})

export class ContractDetailEditComponent implements OnInit {
  contract: Contract;
  id: number;

  constructor(private contractService: ContractService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
      if (this.id > 0) {
        this.contractService.getById(this.id).subscribe((data: Contract) => {
            this.contract = data;
            console.log(this.contract);
        });
      } else if (this.id === 0) {
        console.log('id is 0: adding a new item...');
        this.contract = new Contract(0, 'New Item', 'NEW');
      } else {
        console.log('Invalid id: routing back to home...');
        this.router.navigate(['']);
      }
    });
  }

  onInsert(contract: Contract) {
    this.contractService.addContract(contract).subscribe(
      (data) => {
        this.contract = data;
        console.log('Item ' + this.contract.id + ' has been added.');
        this.router.navigate(['']);
      },
      (error) => console.log(error)
    );
  }

  onUpdate(event: any) {
    if (!this.contract) { return; }
    this.contractService.editContract(this.contract)
      .subscribe((data: Contract) => {
            this.contract = data;
        },
          (error: any) => console.log(error)
        );
  }

  onDelete(contractToDelete: Contract, event: any) {
    const id = contractToDelete.id;
    this.contractService.deleteContract(id)
      .subscribe((data: Contract) => {
            this.contract = data;
            console.log('Item ' + this.contract.id + ' has been updated.');
            this.router.navigate(['']);
        },
        (error: any) => console.log(error)
      );
  }

  onBack() {
    this.router.navigate(['']);
  }
}
