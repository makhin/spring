import { Component, OnInit } from '@angular/core';
import {CustomerItem} from "../models/CustomerItem";
import {DataService} from "../services/data.service";
import {LazyLoadEvent} from "primeng/components/common/api";
import {PaginatedResult} from "../models/Pagination";
import {ActivatedRoute} from "@angular/router";

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

  public constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  public ngOnInit():void {
    this.activatedRoute.params.subscribe(params => {
      this.contractId = +params['id'];
    });
  }

  loadCarsLazy(event: LazyLoadEvent) {
    let currentPage = (event.first - event.first % event.rows) / event.rows + 1;
    this.dataService.getCustomersByContract(this.contractId, currentPage, event.rows, event.globalFilter).subscribe(
      (res: PaginatedResult<CustomerItem[]>) => {
        this.customerItems = res.result;
        this.totalRecords = res.pagination.TotalItems;
      });
  }
}
