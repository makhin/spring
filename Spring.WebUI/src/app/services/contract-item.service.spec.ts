import { TestBed, inject } from '@angular/core/testing';

import { ContractItemService } from './contract-item.service';

describe('ContractItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractItemService]
    });
  });

  it('should ...', inject([ContractItemService], (service: ContractItemService) => {
    expect(service).toBeTruthy();
  }));
});
