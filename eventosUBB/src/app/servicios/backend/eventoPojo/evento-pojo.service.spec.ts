import { TestBed } from '@angular/core/testing';

import { EventoPojoService } from './evento-pojo.service';

describe('EventoPojoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventoPojoService = TestBed.get(EventoPojoService);
    expect(service).toBeTruthy();
  });
});
