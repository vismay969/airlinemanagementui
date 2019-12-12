import { TestBed } from '@angular/core/testing';

import { CompinteractionService } from './compinteraction.service';

describe('CompinteractionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompinteractionService = TestBed.get(CompinteractionService);
    expect(service).toBeTruthy();
  });
});
