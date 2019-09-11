import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUtilidadesComponent } from './formulario-utilidades.component';

describe('FormularioUtilidadesComponent', () => {
  let component: FormularioUtilidadesComponent;
  let fixture: ComponentFixture<FormularioUtilidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioUtilidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioUtilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
