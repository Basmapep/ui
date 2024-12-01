import { TestBed } from '@angular/core/testing';

import { PeptideService } from './peptide.service';

describe('PeptideService', () => {
  let service: PeptideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeptideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
