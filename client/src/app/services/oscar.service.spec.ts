import { TestBed } from '@angular/core/testing';

import { OscarService } from './oscar.service';

describe('MovieService', () => {
  let service: OscarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OscarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
