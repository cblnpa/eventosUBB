import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExpositorEditComponent } from './modal-expositor-edit.component';

describe('ModalExpositorEditComponent', () => {
  let component: ModalExpositorEditComponent;
  let fixture: ComponentFixture<ModalExpositorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExpositorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExpositorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
