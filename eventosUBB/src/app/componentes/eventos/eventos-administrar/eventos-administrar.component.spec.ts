import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosAdministrarComponent } from './eventos-administrar.component';

describe('EventosAdministrarComponent', () => {
  let component: EventosAdministrarComponent;
  let fixture: ComponentFixture<EventosAdministrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosAdministrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosAdministrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
