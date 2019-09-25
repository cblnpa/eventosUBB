import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJornadaEditComponent } from './modal-jornada-edit.component';

describe('ModalJornadaEditComponent', () => {
  let component: ModalJornadaEditComponent;
  let fixture: ComponentFixture<ModalJornadaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalJornadaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalJornadaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
