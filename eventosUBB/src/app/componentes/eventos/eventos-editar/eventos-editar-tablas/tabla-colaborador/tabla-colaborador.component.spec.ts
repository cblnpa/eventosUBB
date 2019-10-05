import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaColaboradorComponent } from './tabla-colaborador.component';

describe('TablaColaboradorComponent', () => {
  let component: TablaColaboradorComponent;
  let fixture: ComponentFixture<TablaColaboradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaColaboradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
