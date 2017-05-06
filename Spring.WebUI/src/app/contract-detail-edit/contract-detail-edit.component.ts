import { Component, OnInit } from '@angular/core';
import { Contract } from '../models/Contract';
import { Router, ActivatedRoute } from '@angular/router';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import { ToastrService } from 'ngx-toastr';
import {DataService} from "../services/data.service";
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {SpringNgbDateParserFormatter} from "../Shared/spring-ngb-date-parser-formatter";

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail-edit.component.html',
  styleUrls: ['./contract-detail-edit.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: SpringNgbDateParserFormatter}]
})

export class ContractDetailEditComponent implements OnInit {
  contract: Contract;
  id: number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private loadingBarService:SlimLoadingBarService,
              private toastrService: ToastrService,
              private dataService: DataService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.loadContract();
    });
  }

  loadContract(){
    this.loadingBarService.start();
    this.dataService.getContract(this.id).subscribe((data: Contract) => {
        this.contract = data;
        this.loadingBarService.complete();
      },
      error => {
        this.loadingBarService.complete();
        this.toastrService.error('Failed to load contracts. ' + error);
        console.log(error);
      });
  }


  onInsert(contract: Contract) {
    this.loadingBarService.start();

    this.dataService.addContract(contract).subscribe(
      (data) => {
        this.contract = data;
        this.loadingBarService.complete();
      },
      error => {
        this.loadingBarService.complete();
        this.toastrService.error('Failed to add contracts. ' + error);
        console.log(error);
      });
  }

  onUpdate(contract: Contract) {
    this.loadingBarService.start();
    this.dataService.editContract(this.contract)
      .subscribe(() => {
          this.loadingBarService.complete();
        },
        error => {
          this.loadingBarService.complete();
          this.toastrService.error('Failed to save contracts. ' + error);
          console.log(error);
        });
  }

  onDelete(contractToDelete: Contract, event: any) {
    this.loadingBarService.start();
    const id = contractToDelete.id;
    this.dataService.deleteContract(id)
      .subscribe((data: Contract) => {
          this.contract = data;
          console.log('Item ' + this.contract.id + ' has been updated.');
          this.router.navigate(['']);
        },
        error => {
          this.loadingBarService.complete();
          this.toastrService.error('Failed to save contracts. ' + error);
          console.log(error);
        });
  }

  onBack() {
    this.router.navigate(['']);
  }
}
