import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUnidadesCrearComponent } from './sub-unidades-crear.component';

describe('SubUnidadesCrearComponent', () => {
  let component: SubUnidadesCrearComponent;
  let fixture: ComponentFixture<SubUnidadesCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubUnidadesCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUnidadesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
