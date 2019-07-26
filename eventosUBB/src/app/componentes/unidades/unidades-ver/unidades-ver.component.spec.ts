import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesVerComponent } from './unidades-ver.component';

describe('UnidadesVerComponent', () => {
  let component: UnidadesVerComponent;
  let fixture: ComponentFixture<UnidadesVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
