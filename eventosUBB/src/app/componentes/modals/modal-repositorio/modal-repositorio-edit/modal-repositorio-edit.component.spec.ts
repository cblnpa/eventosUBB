import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRepositorioEditComponent } from './modal-repositorio-edit.component';

describe('ModalRepositorioEditComponent', () => {
  let component: ModalRepositorioEditComponent;
  let fixture: ComponentFixture<ModalRepositorioEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRepositorioEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRepositorioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
