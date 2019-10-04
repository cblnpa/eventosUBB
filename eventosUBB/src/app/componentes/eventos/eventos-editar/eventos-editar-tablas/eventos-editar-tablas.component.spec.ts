import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosEditarTablasComponent } from './eventos-editar-tablas.component';

describe('EventosEditarTablasComponent', () => {
  let component: EventosEditarTablasComponent;
  let fixture: ComponentFixture<EventosEditarTablasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosEditarTablasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosEditarTablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
