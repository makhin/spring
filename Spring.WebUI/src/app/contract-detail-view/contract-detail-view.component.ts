import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Contract} from '../models/Contract';
import {ContractService} from '../services/contract.service';
import { ViewModelResponse } from '../models/ViewModelResponse';

@Component({
  selector: 'app-contract-detail-view',
  templateUrl: './contract-detail-view.component.html',
  styleUrls: ['./contract-detail-view.component.css']
})
export class ContractDetailViewComponent implements OnInit {

  contract: Contract;

  constructor(private contractService: ContractService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.contractService.get(id).subscribe((data: ViewModelResponse) => {
        if (data != null && data.statusCode === 200) {
          this.contract = data.value;
          console.log(this.contract);
        }
      });
    } else if (id === 0) {
      console.log('id is 0: switching to edit mode...');
      this.router.navigate(['contract/edit', 0]);
    } else {
      console.log('Invalid id: routing back to home...');
      this.router.navigate(['']);
    }
  }

  onContractDetailEdit(contract: Contract) {
    this.router.navigate(['contract/edit', contract.id]);
  }
}
