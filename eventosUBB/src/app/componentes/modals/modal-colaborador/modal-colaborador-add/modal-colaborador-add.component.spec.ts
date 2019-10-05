import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalColaboradorAddComponent } from './modal-colaborador-add.component';

describe('ModalColaboradorAddComponent', () => {
  let component: ModalColaboradorAddComponent;
  let fixture: ComponentFixture<ModalColaboradorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalColaboradorAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalColaboradorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
