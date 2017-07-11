import {Component, OnInit, ViewChild} from '@angular/core';
import { Location } from '@angular/common';
import {CustomerItem} from '../models/CustomerItem';
import {DataService} from '../services/data.service';
import {LazyLoadEvent} from 'primeng/components/common/api';
import {PaginatedResult} from '../models/Pagination';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerShort} from '../models/CustomerShort';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import {DataTable} from 'primeng/primeng';

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
  currentFilter: string;
  currentPage: number;
  currentCustomer: number;
  firstLoad: boolean;

  @ViewChild(DataTable) dataTable: DataTable;

  public constructor(private activatedRoute: ActivatedRoute, private dataService: DataService, private loadingBarService: SlimLoadingBarService, private router: Router, private location: Location) { }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.contractId = +params['id'];
      if (params['pageId'] != null) {
        this.currentPage = +params['pageId'];
      } else {
        this.currentPage = 1;
      }
      if (params['customerId'] != null) {
        this.currentCustomer = +params['customerId'];
      }
      if (params['filter'] != null) {
        this.currentFilter = params['filter'];
      } else {
        this.currentFilter = '';
      }

      const paging = {
        first: ((this.currentPage - 1) * this.dataTable.rows),
        rows: this.dataTable.rows
      };
    });
  }

  loadCustomersLazy(event: LazyLoadEvent) {
    this.loadingBarService.start();
    this.currentPage = (event.first - event.first % event.rows) / event.rows + 1;
    this.currentFilter = event.globalFilter;
    this.dataService.getCustomersByContract(this.contractId, this.currentPage, event.rows, event.globalFilter).subscribe(
      (res: PaginatedResult<CustomerItem[]>) => {
        this.customerItems = res.result;
        this.totalRecords = res.pagination.TotalItems;
        this.currentCustomer = null;
        this.loadingBarService.complete();
      });
    this.setUrl();
  }

  onRowSelect(event) {
    this.dataService.getCustomerShort(event.data.id).subscribe(
      (res: CustomerShort) => {
        this.customerShort = res;
      });
    this.currentCustomer = event.data.id;
    this.setUrl();
  }

  onEdit(id: number) {
    this.router.navigate(['customer', id, 'edit']);
  }

  onInsert(id: number) {
    this.router.navigate(['customer', id, 'new' ]);
  }

  onInsuranceCases(id: number) {
    this.router.navigate(['customer', id, 'cases' ]);
  }

  onBack() {
    this.router.navigate(['']);
  }

  setUrl() {
    let query = '';
    if (this.currentCustomer != null) {
      query += ';customerId=' + this.currentCustomer;
    }
    if (this.currentPage > 1) {
      query += ';pageId=' + this.currentPage;
    }
    if (this.currentFilter !== '') {
      query += ';filter=' + this.currentFilter;
    }

    this.location.replaceState('/contract/' + this.contractId + '/customers', query)
  };
}
