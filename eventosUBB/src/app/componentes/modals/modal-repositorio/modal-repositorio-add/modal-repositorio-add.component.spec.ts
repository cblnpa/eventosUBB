import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRepositorioAddComponent } from './modal-repositorio-add.component';

describe('ModalRepositorioAddComponent', () => {
  let component: ModalRepositorioAddComponent;
  let fixture: ComponentFixture<ModalRepositorioAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRepositorioAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRepositorioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
