import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceCaseListComponent } from './insurance-case-list.component';

describe('InsuranceCaseListComponent', () => {
  let component: InsuranceCaseListComponent;
  let fixture: ComponentFixture<InsuranceCaseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceCaseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
