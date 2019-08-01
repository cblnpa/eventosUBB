import { TestBed } from '@angular/core/testing';

import { ExpositorService } from './expositor.service';

describe('ExpositorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpositorService = TestBed.get(ExpositorService);
    expect(service).toBeTruthy();
  });
});
