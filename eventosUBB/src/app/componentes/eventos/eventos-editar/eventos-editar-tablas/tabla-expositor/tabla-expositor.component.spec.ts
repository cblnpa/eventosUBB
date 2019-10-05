import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaExpositorComponent } from './tabla-expositor.component';

describe('TablaExpositorComponent', () => {
  let component: TablaExpositorComponent;
  let fixture: ComponentFixture<TablaExpositorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaExpositorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaExpositorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
