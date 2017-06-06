import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../services/data.service";
import {ToastrService} from "ngx-toastr";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../models/Customer";
import {SelectItem} from "primeng/components/common/api";
import {Observable} from "rxjs/Observable";
import {Localization} from "../Shared/Localization";

@Component({
  selector: 'app-customer-detail-edit',
  templateUrl: './customer-detail-edit.component.html',
  styleUrls: ['./customer-detail-edit.component.sass']
})
export class CustomerDetailEditComponent implements OnInit {
  //contractId: number;
  customer: Customer;
  id: number;
  customerForm: FormGroup;
  ru: any;
  dateFormat: string;
  sexTypes: SelectItem[];
  groups: SelectItem[];
  departments:string[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private loadingBarService:SlimLoadingBarService,
              private toastrService: ToastrService,
              private dataService: DataService,
              private fb: FormBuilder,
              private loc: Localization) { }

  ngOnInit() {
    this.ru = Localization.calendarRu();
    this.dateFormat = Localization.dateFormatRu();

    this.sexTypes = [];
    this.sexTypes.push({label: 'Мужчина', value: true});
    this.sexTypes.push({label: 'Женщина', value: false});

    this.groups = [];
    this.groups.push({label: '', value: null});
    this.groups.push({label: '1', value: 1});
    this.groups.push({label: '2', value: 2});
    this.groups.push({label: '3', value: 3});

    this.activatedRoute.url.subscribe(segments => {
      if (segments[2].path === "new"){        
        this.customer = new Customer();
        this.customer.id = 0;
        this.customer.contractId = +segments[1].path;
        this.buildForm();
      }else {
        this.id = +segments[1].path;
        this.loadCustomer();
      }      
    });
  }

  buildForm(): void {
    this.customerForm = this.fb.group({
      'id': [this.customer.id],
      'name': [this.customer.name, [Validators.required]],
      'tin': [this.customer.tin, []],
      'address': [this.customer.address, []],
      'passport': [this.customer.passport, []],
      'department': [this.customer.department, []],
      'personnelNumber': [this.customer.personnelNumber, []],
      'dateOfBirth': [this.customer.dateOfBirth, []],
      'additionalInfo': [this.customer.additionalInfo, []],
      'cardNumber': [this.customer.cardNumber, []],
      'disabilityGroup': [this.customer.disabilityGroup, []],
      'mobilePhone': [this.customer.mobilePhone, []],
      'position': [this.customer.position, []],
      'sex': [this.customer.sex, []],
      'startDate': [this.customer.startDate, []],
      'endDate': [this.customer.endDate, []],
          });
    this.customerForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.customerForm) {
      return;
    }
    const form = this.customerForm;
    for (const controlName in this.customerForm.controls) {
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
      'required': 'ФИО обязательно',
    }
  };

  loadCustomer(){
    this.loadingBarService.start();
    this.dataService.getCustomer(this.id).subscribe((data: Customer) => {
        this.customer = data;
        this.buildForm();
        this.loadingBarService.complete();
      },
      error => {
        this.loadingBarService.complete();
        this.toastrService.error(error, 'Ошибка загрузки');
        console.log(error);
      });
  }

  onInsert() {
    this.customer = this.customerForm.value;
    if (this.customer.disabilityGroup === 0){
        this.customer.disabilityGroup = null;
    }
    this.loadingBarService.start();
    this.dataService.addCustomer(this.customer).subscribe(
      (data) => {
        this.customer = data;
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
    this.customer = this.customerForm.value;
    if (this.customer.disabilityGroup === 0){
      this.customer.disabilityGroup = null;
    }
    this.loadingBarService.start();
    this.dataService.editCustomer(this.customer)
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
    this.dataService.deleteCustomer(this.id)
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

  OnDepartmentLookup(event) {
    this.dataService.getDepartmentsByContract(this.customer.contractId, event.query).subscribe(data => {
      this.departments = data;
    });
  }

  onBack() {
    this.router.navigate(['contract', this.customer.contractId, 'customers']);
  }
}
