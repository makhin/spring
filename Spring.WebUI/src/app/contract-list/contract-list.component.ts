import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ContractItem} from '../models/ContractItem';
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {
  contractItems: ContractItem[];
  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.dataService.getAllContracts().subscribe((data: Array<ContractItem>) => {this.contractItems = data; });
  }
}
