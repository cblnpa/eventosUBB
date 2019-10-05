import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaActividadComponent } from './tabla-actividad.component';

describe('TablaActividadComponent', () => {
  let component: TablaActividadComponent;
  let fixture: ComponentFixture<TablaActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
