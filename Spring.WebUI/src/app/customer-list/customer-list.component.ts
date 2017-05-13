import { Component, OnInit } from '@angular/core';
import {CustomerItem} from "../models/CustomerItem";
import {DataService} from "../services/data.service";
import {LazyLoadEvent} from "primeng/components/common/api";

@Component({
  selector: 'app-client-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.sass']
})

export class CustomerListComponent implements OnInit {
  public customerItems: CustomerItem[];
  datasource: CustomerItem[];
  totalRecords: number;


  public constructor(private dataService: DataService) { }

  public ngOnInit():void {
      this.dataService.getCustomersByContract(1).subscribe(
        (data: Array<CustomerItem>) => {
          this.datasource = data;
          this.totalRecords = this.datasource.length;
          this.customerItems = this.datasource.slice(0, 10);
        });
  }

  loadCarsLazy(event: LazyLoadEvent) {
    setTimeout(() => {
      if(this.datasource) {
        this.customerItems = this.datasource.slice(event.first, (event.first + event.rows));
      }
    }, 250);
  }
}
