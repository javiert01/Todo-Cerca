import { TestBed } from '@angular/core/testing';

import { DinamicUrlService } from './dinamic-url.service';

describe('DinamicUrlService', () => {
  let service: DinamicUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DinamicUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
