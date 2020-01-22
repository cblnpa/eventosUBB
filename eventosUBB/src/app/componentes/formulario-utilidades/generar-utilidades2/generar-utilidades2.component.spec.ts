import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarUtilidades2Component } from './generar-utilidades2.component';

describe('GenerarUtilidades2Component', () => {
  let component: GenerarUtilidades2Component;
  let fixture: ComponentFixture<GenerarUtilidades2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarUtilidades2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarUtilidades2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
