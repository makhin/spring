import { Component, OnInit } from '@angular/core';
import { Contract } from '../models/Contract';
import {Router, ActivatedRoute} from '@angular/router';
import { ContractService } from '../services/contract.service';
import { ViewModelResponse } from '../models/ViewModelResponse';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.css']
})

export class ContractDetailComponent implements OnInit {
  contract: Contract;
  id: number;

  constructor(private contractService: ContractService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      if (this.id) {
        this.contractService.get(this.id).subscribe((data: ViewModelResponse) => {
          if (data != null && data.statusCode === 200) {
            this.contract = data.value;
            console.log(this.contract);
          }
        });
      } else {
        console.log('Invalid id: routing back to home...');
        this.router.navigate(['']);
      }
    });
  }
}
