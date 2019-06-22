import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasEventoComponent } from './pruebas-evento.component';

describe('PruebasEventoComponent', () => {
  let component: PruebasEventoComponent;
  let fixture: ComponentFixture<PruebasEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebasEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebasEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
