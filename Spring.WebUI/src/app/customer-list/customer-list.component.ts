import { Component, OnInit } from '@angular/core';
import {CustomerItem} from "../models/CustomerItem";
import {DataService} from "../services/data.service";
import {LazyLoadEvent} from "primeng/components/common/api";
import {PaginatedResult} from "../models/Pagination";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerShort} from "../models/CustomerShort";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Component({
  selector: 'app-client-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.sass']
})

export class CustomerListComponent implements OnInit {
  public customerItems: CustomerItem[];
  totalRecords: number;
  contractId: number;
  selectedCustomer: CustomerItem;
  customerShort: CustomerShort;

  public constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private loadingBarService:SlimLoadingBarService, private router: Router) { }

  public ngOnInit():void {
    this.activatedRoute.params.subscribe(params => {
      this.contractId = +params['id'];
    });
  }

  loadCustomersLazy(event: LazyLoadEvent) {
    this.loadingBarService.start();
    let currentPage = (event.first - event.first % event.rows) / event.rows + 1;
    this.dataService.getCustomersByContract(this.contractId, currentPage, event.rows, event.globalFilter).subscribe(
      (res: PaginatedResult<CustomerItem[]>) => {
        this.customerItems = res.result;
        this.totalRecords = res.pagination.TotalItems;
        this.loadingBarService.complete();
      });
  }

  onRowSelect(event) {
    this.dataService.getCustomerShort(event.data.id).subscribe(
      (res: CustomerShort) => {
        this.customerShort = res;
      });
  }

  onEdit(id: number) {
    this.router.navigate(['customer', id, 'edit']);
  }

  onInsert(id: number) {
    this.router.navigate(['customer', id, 'new' ]);
  }

  onBack() {
    this.router.navigate(['']);
  }
}
