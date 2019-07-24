import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosDetallesPublicComponent } from './eventos-detalles-public.component';

describe('EventosDetallesPublicComponent', () => {
  let component: EventosDetallesPublicComponent;
  let fixture: ComponentFixture<EventosDetallesPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosDetallesPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosDetallesPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
