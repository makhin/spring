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
        this.contractService.get(this.id).subscribe((data: ViewModelResponse) => {
          if (data != null && data.statusCode === 200) {
            this.contract = data.value;
            console.log(this.contract);
          }
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
      .subscribe((data: ViewModelResponse) => {
          if (data != null && data.statusCode === 200) {
            this.contract = data.value;
            console.log('Item ' + this.contract.id + ' has been updated.');
            this.router.navigate(['contract', this.contract.id, 'edit']);
          } else {
            console.log('Update an error occured');
          }
        },
        (error: any) => console.log(error)
        );
  }

  onDelete(contractToDelete: Contract, event: any) {
    const id = contractToDelete.id;
    this.contractService.deleteContract(id)
      .subscribe((data: ViewModelResponse) => {
          if (data != null && data.statusCode === 200) {
            this.contract = data.value;
            console.log('Item ' + this.contract.id + ' has been updated.');
            this.router.navigate(['']);
          } else {
            console.log('Delete An error occurred');
          }
        },
        (error: any) => console.log(error)
      );
  }

  onBack() {
    this.router.navigate(['']);
  }
}
