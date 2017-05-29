import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectItem} from "primeng/dist/components/common/api";
import {ActivatedRoute, Router} from "@angular/router";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ToastrService} from "ngx-toastr";
import {Localization} from "../Shared/Localization";
import {LookupService} from "../services/lookup.service";
import {MedicalInsuranceCase} from "../models/InsuranceCase";
import {Observable} from "rxjs/Rx";
import {DataService} from "../services/data.service";
import {Order} from "../models/Order";
import {Mkb10} from "../models/Mkb10";

@Component({
  selector: 'app-insurance-case-detail-edit',
  templateUrl: './insurance-case-detail-edit.component.html',
  styleUrls: ['./insurance-case-detail-edit.component.sass']
})
export class InsuranceCaseDetailEditComponent implements OnInit {
  customerId: number;
  insuranceCase: MedicalInsuranceCase;
  id: number;
  caseForm: FormGroup;
  ru: any;
  dateFormat: string;
  therapy: SelectItem[];
  treatments: SelectItem[];
  hospitals: SelectItem[];
  hospitalDepartments: SelectItem[];
  mkb10s: SelectItem[];
  totalAmount: number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private loadingBarService: SlimLoadingBarService,
              private toastrService: ToastrService,
              private lookupService: LookupService,
              private dataService: DataService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.hospitals = [];
    this.hospitalDepartments = [];
    this.therapy = [];
    this.treatments = [];
    this.loadingBarService.start();
    this.ru = Localization.calendarRu();
    this.dateFormat = Localization.dateFormatRu();

    this.lookupService.getTherapy().subscribe((data: any) => {
      this.therapy.push({label: '', value: null});
      for (let item of data) {
        this.therapy.push({label: item, value: item});
      }
    });
    this.lookupService.getThreatment().subscribe((data: any) => {
      this.treatments.push({label: '', value: null});
      for (let item of data) {
        this.treatments.push({label: item, value: item});
      }
    });
    this.lookupService.getHospital(null).subscribe((data: any) => {
      this.hospitals.push({label: '', value: null});
      for (let item of data) {
        this.hospitals.push({label: item.name, value: item.id});
      }
    });

    this.hospitalDepartments = [];

    this.activatedRoute.url.subscribe(segments => {
      if (segments[2].path === "new") {
        this.id = 0;
        this.customerId = +segments[1].path;
      } else {
        this.id = +segments[1].path;
      }
      if (this.id > 0) {
        this.loadCase();
      }
      else {
        this.insuranceCase = new MedicalInsuranceCase();
        this.insuranceCase.customerId = this.customerId;
        this.insuranceCase.id = 0;
        this.insuranceCase.orders = new Array<Order>();
        this.buildForm();
        this.loadingBarService.complete();
      }
    });
  }

  buildForm(): void {
    this.caseForm = this.fb.group({
      'mkb10': [this.insuranceCase.mkb10, [Validators.required]],
      'therapy': [this.insuranceCase.therapy],
      'treatment': [this.insuranceCase.treatment],
      'hospitalId': [this.insuranceCase.hospitalId],
      'hospitalDepartmentId': [this.insuranceCase.hospitalDepartmentId],
      'beginDate': [this.insuranceCase.beginDate],
      'endDate': [this.insuranceCase.endDate],
      'reportDate': [this.insuranceCase.reportDate],
      'documentDate': [this.insuranceCase.documentDate],
      'foodCosts': [this.insuranceCase.foodCosts],
      'diagnosisCosts': [this.insuranceCase.diagnosisCosts],
      'treatmentСosts': [this.insuranceCase.treatmentСosts],
      'orders': this.fb.array(this.buildOrderForm(this.insuranceCase.orders))
    });
    this.caseForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.caseForm.controls['foodCosts'].valueChanges.subscribe(data => this.calcTotalAmount(data));
    this.caseForm.controls['diagnosisCosts'].valueChanges.subscribe(data => this.calcTotalAmount(data));
    this.caseForm.controls['treatmentСosts'].valueChanges.subscribe(data => this.calcTotalAmount(data));
  }

  calcTotalAmount(data){
    this.totalAmount = +this.caseForm.controls['foodCosts'].value + +this.caseForm.controls['diagnosisCosts'].value + +this.caseForm.controls['treatmentСosts'].value;
  }

  buildOrderForm(orders: Order[]):AbstractControl[] {
    if (orders == null){
      return;
    }
    let orderControls:AbstractControl[] = [];
    for(let order of orders){
      orderControls.push(this.createOrderGroup(order));
    }

    return orderControls;
  }

  createOrderGroup(order: Order){
    let formGroup = this.fb.group({
      'id':[order.id],
      'orderDate': [order.recipeDate],
      'orderNumber': [order.orderNumber],
      'recipeDate': [order.recipeDate],
      'recipeNumber': [order.recipeNumber],
      'amount': [order.amount, [Validators.required]],
      'pharmacy': [order.pharmacy]
    });
    return formGroup;
  }

  onValueChanged(data?: any) {
    if (!this.caseForm) {
      return;
    }
    this.iterateByFormGroup(this.caseForm);
  }

  iterateByFormGroup(group: FormGroup){
    for (let controlName in group.controls) {
      const control = group.get(controlName);
      if (control instanceof FormArray){
        console.log(control);
        for (let gr of control.controls) {
          this.iterateByFormGroup(<FormGroup>gr)
        }
      }
      else{
        this.showValidationMessage(controlName, control)
      }
    }
  }

  showValidationMessage(controlName: string, control: AbstractControl) {
    if (control && control.dirty && !control.valid) {
      console.log(control);
      const message = this.validationMessages[controlName];
      for (const key in control.errors) {
        this.toastrService.error(message[key], null,)
      }
    }
  }

  validationMessages = {
    'mkb10': {
      'required': 'Диагноз обязателен',
    },
    'amount':{
      'required': 'Сумма обязательна',
    },
  };

  loadCase() {
    this.dataService.getInsuranceCase(this.id).subscribe((data: MedicalInsuranceCase) => {
        this.customerId = data.customerId;
        if (data.hospitalDepartmentId != null) {
          this.lookupService.getHospital(data.hospitalId).subscribe((dpts) => {
            this.hospitalDepartments = [];
            this.hospitalDepartments.push({label: '', value: null});
            for (let item of dpts) {
              this.hospitalDepartments.push({label: item.name, value: item.id});
            }
            this.insuranceCase = data;
            this.buildForm();
          });
        }
        else {
          this.insuranceCase = data;
          this.buildForm();
        }
      },
      error => {
        this.toastrService.error(error, 'Ошибка загрузки');
      },
      () => {
        this.loadingBarService.complete();
      });
  }

  onMkb10Lookup(event) {
    this.lookupService.getMkb10(event.query).subscribe(data => {
      this.mkb10s = data;
    });
  }

  onHospitalChange(event) {
    this.lookupService.getHospital(event.value).subscribe((dpts) => {
      this.hospitalDepartments = [];
      this.hospitalDepartments.push({label: '', value: null});
      for (let item of dpts) {
        this.hospitalDepartments.push({label: item.name, value: item.id});
      }
    });
  }

  addOrder() {
    const control = <FormArray>this.caseForm.controls['orders'];
    let order = new Order();
    order.id = 0;
    control.push(this.createOrderGroup(order));
  }

  removeOrder(i: number) {
    const control = <FormArray>this.caseForm.controls['orders'];
    control.removeAt(i);
  }

  onInsert() {
    this.insuranceCase = this.caseForm.value;
    this.insuranceCase.customerId = this.customerId;
    this.loadingBarService.start();
    this.dataService.addMedicalInsuranceCase(this.insuranceCase).subscribe(
      (data) => {
        this.insuranceCase = data;
        this.loadingBarService.complete();
        this.toastrService.success('Сохранено');
        this.router.navigate(['customer', this.customerId, 'cases']);
      },
      error => {
        this.loadingBarService.complete();
        this.toastrService.error(error, 'Ошибка добавления');
        console.log(error);
      });
  }


  onUpdate() {
    this.insuranceCase = this.caseForm.value;
    this.insuranceCase.id = this.id;
    this.insuranceCase.customerId = this.customerId;
    this.loadingBarService.start();
    this.dataService.editMedicalInsuranceCase(this.insuranceCase)
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

  onBack(){
    this.router.navigate(['customer', this.customerId, 'cases']);
  }
}
