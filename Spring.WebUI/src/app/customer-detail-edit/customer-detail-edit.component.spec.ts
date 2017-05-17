import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailEditComponent } from './customer-detail-edit.component';

describe('CustomerDetailEditComponent', () => {
  let component: CustomerDetailEditComponent;
  let fixture: ComponentFixture<CustomerDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
