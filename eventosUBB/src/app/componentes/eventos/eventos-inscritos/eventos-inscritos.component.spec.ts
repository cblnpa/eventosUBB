import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosInscritosComponent } from './eventos-inscritos.component';

describe('EventosInscritosComponent', () => {
  let component: EventosInscritosComponent;
  let fixture: ComponentFixture<EventosInscritosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosInscritosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosInscritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
