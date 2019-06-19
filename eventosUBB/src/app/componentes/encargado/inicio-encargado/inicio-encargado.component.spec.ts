import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioEncargadoComponent } from './inicio-encargado.component';

describe('InicioEncargadoComponent', () => {
  let component: InicioEncargadoComponent;
  let fixture: ComponentFixture<InicioEncargadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioEncargadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioEncargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
