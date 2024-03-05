import { TestBed } from '@angular/core/testing';

import { PrefrencesService } from './prefrences.service';

describe('PrefrencesService', () => {
  let service: PrefrencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefrencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
