import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDetailViewComponent } from './contract-detail-view.component';

describe('ContractDetailViewComponent', () => {
  let component: ContractDetailViewComponent;
  let fixture: ComponentFixture<ContractDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
