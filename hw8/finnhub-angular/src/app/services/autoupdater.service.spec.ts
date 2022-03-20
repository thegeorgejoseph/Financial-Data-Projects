import { TestBed } from '@angular/core/testing';

import { AutoupdaterService } from './autoupdater.service';

describe('AutoupdaterService', () => {
  let service: AutoupdaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoupdaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
