import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectItem} from "primeng/dist/components/common/api";
import {ActivatedRoute, Router} from "@angular/router";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ToastrService} from "ngx-toastr";
import {Localization} from "../Shared/Localization";
import {LookupService} from "../services/lookup.service";
import {MedicalInsuranceCase} from "../models/MedicalInsuranceCase";
import {Observable} from "rxjs/Observable";
import {DataService} from "../services/data.service";

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
  mkb10s:SelectItem[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private loadingBarService:SlimLoadingBarService,
              private toastrService: ToastrService,
              private lookupService: LookupService,
              private dataService: DataService,
              private fb: FormBuilder) {
  }

  ngOnInit() {

    this.loadingBarService.start();
    this.ru = Localization.calendarRu();
    this.dateFormat = Localization.dateFormatRu();

    this.lookupService.getTherapy().subscribe((data: any) => {
      this.therapy = [];
      this.therapy.push({label:'', value: null});
      for (let item of data) {
        this.therapy.push({label: item, value: item});
      }
    });
    this.lookupService.getThreatment().subscribe((data: any) => {
      this.treatments = [];
      this.treatments.push({label:'', value: null});
      for (let item of data) {
        this.treatments.push({label: item, value: item});
      }
    });
    this.lookupService.getHospital(null).subscribe((data: any) => {
      this.hospitals = [];
      this.hospitals.push({label:'', value: null});
      for (let item of data) {
        this.hospitals.push({label: item.name, value: item});
      }
    });

    this.hospitalDepartments = [];

    this.activatedRoute.url.subscribe(segments => {
      if (segments[2].path === "new"){
        this.id = 0;
        this.customerId = +segments[1].path;
      }else {
        this.id = +segments[1].path;
      }
      if (this.id > 0) {
        this.loadCase();
      }
      else if (this.customerId > 0){
        this.insuranceCase = new MedicalInsuranceCase();
        this.insuranceCase.id = 0;
        this.insuranceCase.customerId = this.customerId;
        this.buildForm();
        this.loadingBarService.complete();
      }
      else{
        Observable.throw('Не указан идентификатор клиента или контракта');
      }
    });
  }

  buildForm(): void {
    this.caseForm = this.fb.group({
      'mkb10': [this.insuranceCase.mkb10, [Validators.required]],
      'therapy': [this.insuranceCase.therapy],
      'treatment': [this.insuranceCase.treatment],
      'hospital': [],
      'hospitalDepartments': []
    });
    this.caseForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.caseForm) {
      return;
    }
    const form = this.caseForm;
    for (const controlName in this.caseForm.controls) {
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
    'mkb10': {
      'required': 'Диагноз обязателен',
    }
  };

  loadCase(){
    this.dataService.getMedicalCase(this.id).subscribe((data: MedicalInsuranceCase) => {
        this.insuranceCase = data;
        this.customerId = this.insuranceCase.customerId;
        this.buildForm();
        this.loadingBarService.complete();
      },
      error => {
        this.loadingBarService.complete();
        this.toastrService.error(error, 'Ошибка загрузки');
        console.log(error);
      });
  }

  onMkb10Lookup(event){
    this.lookupService.getMkb10(event.query).subscribe(data => {
      this.mkb10s = data;
    });
  }
}
