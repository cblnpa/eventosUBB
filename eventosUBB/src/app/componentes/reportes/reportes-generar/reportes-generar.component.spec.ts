import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesGenerarComponent } from './reportes-generar.component';

describe('ReportesGenerarComponent', () => {
  let component: ReportesGenerarComponent;
  let fixture: ComponentFixture<ReportesGenerarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesGenerarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesGenerarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
