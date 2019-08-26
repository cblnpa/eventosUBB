import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUnidadesVerComponent } from './sub-unidades-ver.component';

describe('SubUnidadesVerComponent', () => {
  let component: SubUnidadesVerComponent;
  let fixture: ComponentFixture<SubUnidadesVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubUnidadesVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUnidadesVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
