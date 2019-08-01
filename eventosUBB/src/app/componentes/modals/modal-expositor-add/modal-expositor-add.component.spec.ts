import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExpositorAddComponent } from './modal-expositor-add.component';

describe('ModalExpositorAddComponent', () => {
  let component: ModalExpositorAddComponent;
  let fixture: ComponentFixture<ModalExpositorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalExpositorAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExpositorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
