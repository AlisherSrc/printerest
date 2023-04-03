import { TestBed } from '@angular/core/testing';

import { PinsService } from './pins-service.service';

describe('PinsServiceService', () => {
  let service: PinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
