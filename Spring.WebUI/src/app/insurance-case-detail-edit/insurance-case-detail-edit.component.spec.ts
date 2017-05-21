import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCaseDetailEditComponent } from './insurance-case-detail-edit.component';

describe('InsuranceCaseDetailEditComponent', () => {
  let component: InsuranceCaseDetailEditComponent;
  let fixture: ComponentFixture<InsuranceCaseDetailEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceCaseDetailEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceCaseDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
