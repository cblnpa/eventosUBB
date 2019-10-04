import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaJornadaComponent } from './tabla-jornada.component';

describe('TablaJornadaComponent', () => {
  let component: TablaJornadaComponent;
  let fixture: ComponentFixture<TablaJornadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaJornadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaJornadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
