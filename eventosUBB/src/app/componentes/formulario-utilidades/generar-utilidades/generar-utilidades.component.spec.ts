import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarUtilidadesComponent } from './generar-utilidades.component';

describe('GenerarUtilidadesComponent', () => {
  let component: GenerarUtilidadesComponent;
  let fixture: ComponentFixture<GenerarUtilidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarUtilidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarUtilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
