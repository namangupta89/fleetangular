import { TestBed } from '@angular/core/testing';

import { FleetserviceService } from './fleetservice.service';

describe('FleetserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FleetserviceService = TestBed.get(FleetserviceService);
    expect(service).toBeTruthy();
  });
});
