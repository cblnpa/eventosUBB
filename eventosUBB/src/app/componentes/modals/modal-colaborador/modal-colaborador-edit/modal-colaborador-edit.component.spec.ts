import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColaboradorEditComponent } from './modal-colaborador-edit.component';

describe('ModalColaboradorEditComponent', () => {
  let component: ModalColaboradorEditComponent;
  let fixture: ComponentFixture<ModalColaboradorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalColaboradorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalColaboradorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
