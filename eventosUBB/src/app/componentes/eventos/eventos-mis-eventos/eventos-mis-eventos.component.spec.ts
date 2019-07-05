import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosMisEventosComponent } from './eventos-mis-eventos.component';

describe('EventosMisEventosComponent', () => {
  let component: EventosMisEventosComponent;
  let fixture: ComponentFixture<EventosMisEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosMisEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosMisEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
