import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesCrearComponent } from './unidades-crear.component';

describe('UnidadesCrearComponent', () => {
  let component: UnidadesCrearComponent;
  let fixture: ComponentFixture<UnidadesCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
