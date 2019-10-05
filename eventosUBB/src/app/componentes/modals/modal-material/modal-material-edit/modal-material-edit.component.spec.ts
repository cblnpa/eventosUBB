import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMaterialEditComponent } from './modal-material-edit.component';

describe('ModalMaterialEditComponent', () => {
  let component: ModalMaterialEditComponent;
  let fixture: ComponentFixture<ModalMaterialEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMaterialEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMaterialEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
