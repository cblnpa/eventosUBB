import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJornadaAddComponent } from './modal-jornada-add.component';

describe('ModalJornadaAddComponent', () => {
  let component: ModalJornadaAddComponent;
  let fixture: ComponentFixture<ModalJornadaAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalJornadaAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalJornadaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
