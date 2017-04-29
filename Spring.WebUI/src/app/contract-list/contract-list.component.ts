import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContractItemService } from '../services/contract-item.service';
import {ContractItem} from '../models/ContractItem';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  contractItems: ContractItem[];
  constructor(private contractService: ContractItemService, private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.contractService.getAll().subscribe((data: Array<ContractItem>) => {this.contractItems = data; });
  }

  onContractDetailEdit(id: number) {
    this.router.navigate(['contract', id, 'edit']);
  }
}
