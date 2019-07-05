import { TestBed } from '@angular/core/testing';

import { EventoUsersService } from './evento-users.service';

describe('EventoUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventoUsersService = TestBed.get(EventoUsersService);
    expect(service).toBeTruthy();
  });
});
