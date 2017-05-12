import { Component, OnInit } from '@angular/core';
import { Contract } from '../models/Contract';
import { Router, ActivatedRoute } from '@angular/router';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import { ToastrService } from 'ngx-toastr';
import {DataService} from "../services/data.service";
import {NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {SpringNgbDateParserFormatter} from "../Shared/spring-ngb-date-parser-formatter";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail-edit.component.html',
  styleUrls: ['./contract-detail-edit.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: SpringNgbDateParserFormatter}]
})

export class ContractDetailEditComponent implements OnInit {
  contract: Contract;
  id: number;
  contractForm: FormGroup;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private loadingBarService:SlimLoadingBarService,
              private toastrService: ToastrService,
              private dataService: DataService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.loadContract();
      }
      else {
        this.contract = new Contract();
        this.contract.id = 0;
        this.buildForm();
      }
    });
  }

  buildForm(): void {
    this.contractForm = this.fb.group({
      'name': [this.contract.name, [Validators.required]],
      'code': [this.contract.code, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      'description': [this.contract.description],
      'beginDate': [this.contract.beginDate],
      'endDate': [this.contract.endDate],
      'isActive': [this.contract.isActive, [Validators.required]]
    });
    this.contractForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.contractForm) {
      return;
    }
    const form = this.contractForm;
    for (const controlName in this.contractForm.controls) {
      const control = form.get(controlName);
      if (control && control.dirty && !control.valid) {
        const message = this.validationMessages[controlName];
        for (const key in control.errors) {
          this.toastrService.error(message[key], null, )
        }
      }
    }
  }
  validationMessages = {
    'name': {
      'required': 'Название обязательно',
    },
    'code': {
      'required': 'Код обязателен',
      'maxlength': 'Код должен быть меньше 11 знаков',
      'minlength': 'Код должен быть больше 2 знаков',
    },
    'isActive': {
      'required': 'Необходимо указать активный или нет',
    },
  };

  loadContract(){
    this.loadingBarService.start();
    this.dataService.getContract(this.id).subscribe((data: Contract) => {
        this.contract = data;
        this.buildForm();
        this.loadingBarService.complete();
      },
      error => {
        this.loadingBarService.complete();
        this.toastrService.error(error, 'Ошикбка загрузки');
        console.log(error);
      });
  }

  onInsert() {
    this.contract = this.contractForm.value;
    this.loadingBarService.start();
    this.dataService.addContract(this.contract).subscribe(
      (data) => {
        this.contract = data;
        this.loadingBarService.complete();
        this.toastrService.success('Сохранено');
        this.router.navigate(['']);
      },
      error => {
        this.loadingBarService.complete();
        this.toastrService.error(error, 'Ошибка добавления');
        console.log(error);
      });
  }

  onUpdate() {
    this.contract = this.contractForm.value;
    this.loadingBarService.start();
    this.dataService.editContract(this.contract)
      .subscribe(() => {
          this.loadingBarService.complete();
          this.toastrService.success('Сохранено');
        },
        error => {
          this.loadingBarService.complete();
          this.toastrService.error(error, 'Ошибка сохранения');
          console.log(error);
        });
  }

  onDelete() {
    this.loadingBarService.start();
    this.dataService.deleteContract(this.id)
      .subscribe(() => {
          this.loadingBarService.complete();
          this.router.navigate(['']);
        },
        error => {
          this.loadingBarService.complete();
          this.toastrService.error(error, 'Ошибка удаления');
          console.log(error);
        });
  }

  onBack() {
    this.router.navigate(['']);
  }
}
