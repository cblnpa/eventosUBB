import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMaterialAddComponent } from './modal-material-add.component';

describe('ModalMaterialAddComponent', () => {
  let component: ModalMaterialAddComponent;
  let fixture: ComponentFixture<ModalMaterialAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMaterialAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMaterialAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
