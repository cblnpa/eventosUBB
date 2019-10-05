import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActividadEditComponent } from './modal-actividad-edit.component';

describe('ModalActividadEditComponent', () => {
  let component: ModalActividadEditComponent;
  let fixture: ComponentFixture<ModalActividadEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalActividadEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActividadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
