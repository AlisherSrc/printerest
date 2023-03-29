import { TestBed } from '@angular/core/testing';

import { PinsServiceService } from './pins-service.service';

describe('PinsServiceService', () => {
  let service: PinsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PinsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
