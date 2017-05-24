import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectItem} from "primeng/dist/components/common/api";
import {ActivatedRoute, Router} from "@angular/router";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ToastrService} from "ngx-toastr";
import {Localization} from "../Shared/Localization";
import {LookupService} from "../services/lookup.service";
import {MedicalInsuranceCase} from "../models/MedicalInsuranceCase";
import {Observable} from "rxjs/Rx";
import {DataService} from "../services/data.service";
import {Order} from "../models/Order";

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

  order: Order = new Order();
  displayOrderDialog: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private loadingBarService:SlimLoadingBarService,
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
      this.therapy.push({label:'', value: null});
      for (let item of data) {
        this.therapy.push({label: item, value: item});
      }
    });
    this.lookupService.getThreatment().subscribe((data: any) => {
      this.treatments.push({label:'', value: null});
      for (let item of data) {
        this.treatments.push({label: item, value: item});
      }
    });
    this.lookupService.getHospital(null).subscribe((data: any) => {
      this.hospitals.push({label:'', value: null});
      for (let item of data) {
        this.hospitals.push({label: item.name, value: item.id});
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
      else {
        this.insuranceCase = new MedicalInsuranceCase();
        this.insuranceCase.id = 0;
        this.insuranceCase.customerId = this.customerId;
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
      'hospital': [this.insuranceCase.hospitalId],
      'hospitalDepartment': [this.insuranceCase.hospitalDepartmentId],
      'beginDate': [this.insuranceCase.beginDate],
      'endDate': [this.insuranceCase.endDate],
      'reportDate': [this.insuranceCase.reportDate],
      'documentDate': [this.insuranceCase.documentDate]
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

  loadCase() {
    this.dataService.getInsuranceCase(this.id).map((data: MedicalInsuranceCase) => {
        if (data.hospital.parentId == null) {
          data.hospitalId = data.hospital.id
        }
        else {
          data.hospitalId = data.hospital.parentId;
          data.hospitalDepartmentId = data.hospital.id;
        }
        return data;
      }
    ).subscribe((data: MedicalInsuranceCase) => {
        this.customerId = data.customerId;
        if (data.hospitalDepartmentId != null){
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

  onMkb10Lookup(event){
    this.lookupService.getMkb10(event.query).subscribe(data => {
      this.mkb10s = data;
    });
  }

  onHospitalChange(event){
    this.lookupService.getHospital(event.value).subscribe((dpts) => {
      this.hospitalDepartments = [];
      this.hospitalDepartments.push({label: '', value: null});
      for (let item of dpts) {
        this.hospitalDepartments.push({label: item.name, value: item.id});
      }
    });
  }

  showDialogToAdd() {
    this.displayOrderDialog = true;
  }
}
