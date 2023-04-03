import { TestBed } from '@angular/core/testing';

import { SearchBarActiveService } from './search-bar-active.service';

describe('SearchBarActiveService', () => {
  let service: SearchBarActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchBarActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
