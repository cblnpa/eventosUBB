import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SidebarService,
  EventoService,
  ColaboradorService,
  UserService,
  EventoPojoService,
  CiudadService,
  EventoUsersService,
  UnidadService,
  JornadaService,
  ExpositorService,
  ActividadService,
  MaterialService,
  ModalService
 } from './servicio.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SidebarService,
    EventoService,
    ColaboradorService,
    UserService,
    EventoPojoService,
    CiudadService,
    EventoUsersService,
    UnidadService,
    JornadaService,
    ExpositorService,
    ActividadService,
    MaterialService,
    ModalService
  ],
  declarations: [],
  
})
export class ServicioModule { }
