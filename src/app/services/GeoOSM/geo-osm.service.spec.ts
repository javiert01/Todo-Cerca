import { TestBed } from '@angular/core/testing';

import { GeoOSMService } from './geo-osm.service';

describe('GeoOSMService', () => {
  let service: GeoOSMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoOSMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
