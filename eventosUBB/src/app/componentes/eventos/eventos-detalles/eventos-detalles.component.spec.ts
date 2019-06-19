import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosDetallesComponent } from './eventos-detalles.component';

describe('EventosDetallesComponent', () => {
  let component: EventosDetallesComponent;
  let fixture: ComponentFixture<EventosDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
