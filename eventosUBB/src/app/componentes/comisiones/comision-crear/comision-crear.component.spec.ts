import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionCrearComponent } from './comision-crear.component';

describe('ComisionCrearComponent', () => {
  let component: ComisionCrearComponent;
  let fixture: ComponentFixture<ComisionCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComisionCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
