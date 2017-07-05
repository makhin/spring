import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../services/data.service';
import {CustomerInsuranceCases} from '../models/CustomerInsuranceCases';
import {InsuranceCaseItem} from "../models/InsuranceCaseItem";

@Component({
  selector: 'app-insurance-case-list',
  templateUrl: './insurance-case-list.component.html',
  styleUrls: ['./insurance-case-list.component.sass']
})
export class InsuranceCaseListComponent implements OnInit {
  customer: CustomerInsuranceCases;
  insurCaseList: InsuranceCaseItem[];
  caseId: number;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getInsuranceCases(params['id']);
    });
  }

  getInsuranceCases(customerId: number) {
    this.dataService.getInsuranceCaseItemsByCustomerId(customerId)
      .subscribe((data: CustomerInsuranceCases) => {
        this.customer = data;
        this.insurCaseList = this.customer.insuranceCases;
      });
  }

  onRowSelect(event) {
    this.caseId = event.data.id
  }

  onEdit(id: number) {
    this.router.navigate(['case', id, 'edit']);
  }

  onInsert(id: number) {
    this.router.navigate(['case', id, 'new' ]);
  }

  onBack() {
    this.router.navigate(['contract', this.customer.contractId , 'customers']);
  }
}
