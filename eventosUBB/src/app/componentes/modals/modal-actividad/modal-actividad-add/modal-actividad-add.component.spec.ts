import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActividadAddComponent } from './modal-actividad-add.component';

describe('ModalActividadAddComponent', () => {
  let component: ModalActividadAddComponent;
  let fixture: ComponentFixture<ModalActividadAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalActividadAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActividadAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
