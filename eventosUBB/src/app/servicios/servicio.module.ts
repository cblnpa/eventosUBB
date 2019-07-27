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
  UnidadService
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
    UnidadService
  ],
  declarations: [],
  
})
export class ServicioModule { }
