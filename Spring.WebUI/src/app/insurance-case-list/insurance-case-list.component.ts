import { Component, OnInit } from '@angular/core';
import {InsuranceCaseItem} from "../models/InsuranceCaseItem";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-insurance-case-list',
  templateUrl: './insurance-case-list.component.html',
  styleUrls: ['./insurance-case-list.component.sass']
})
export class InsuranceCaseListComponent implements OnInit {
  insuranceCaseItems: InsuranceCaseItem[];
  customerId: number;
  contractId: number;
  caseId: number;

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.customerId = +params['id'];
      this.contractId = 1; //TODO init correct id
      this.getInsuranceCases();
    });
  }

  getInsuranceCases() {
    this.dataService.getInsuranceCaseItemsByCustomerId(this.customerId).subscribe((data: Array<InsuranceCaseItem>) => {this.insuranceCaseItems = data; });
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
    this.router.navigate(['contract', this.contractId ,'customers']);
  }
}
