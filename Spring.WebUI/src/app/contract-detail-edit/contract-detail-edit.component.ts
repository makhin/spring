import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Contract } from '../models/Contract';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractService } from '../services/contract.service';
import {NgbDateConverter} from "../Shared/ngb-date-converter";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail-edit.component.html',
  styleUrls: ['./contract-detail-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class ContractDetailEditComponent implements OnInit {
  contract: Contract;
  id: number;

  constructor(private contractService: ContractService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private loadingBarService:SlimLoadingBarService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];

      this.loadingBarService.start();
      this.contractService.getById(this.id).subscribe((data: Contract) => {
          this.contract = data;
          this.contract.beginDate = NgbDateConverter.parse(this.contract.beginDate.toString());
          this.contract.endDate = NgbDateConverter.parse(this.contract.endDate.toString());
          this.loadingBarService.complete();
      },
      error => {
        this.loadingBarService.complete();
        this.toastrService.error('Failed to load contracts. ' + error);
        console.log(error);
      });
    });
  }

  onInsert(contract: Contract) {
    this.loadingBarService.start();
    this.contract.beginDate = NgbDateConverter.format(this.contract.beginDate);
    this.contract.endDate = NgbDateConverter.format(this.contract.endDate);

    this.contractService.addContract(contract).subscribe(
      (data) => {
        this.contract = data;
        this.contract.beginDate = NgbDateConverter.parse(this.contract.beginDate.toString());
        this.contract.endDate = NgbDateConverter.parse(this.contract.endDate.toString());
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
    this.contract.beginDate = NgbDateConverter.format(this.contract.beginDate);
    this.contract.endDate = NgbDateConverter.format(this.contract.endDate);
    this.contractService.editContract(this.contract)
      .subscribe((data: Contract) => {
          this.contract = data;
          this.contract.beginDate = NgbDateConverter.parse(this.contract.beginDate.toString());
          this.contract.endDate = NgbDateConverter.parse(this.contract.endDate.toString());
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
    this.contractService.deleteContract(id)
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
