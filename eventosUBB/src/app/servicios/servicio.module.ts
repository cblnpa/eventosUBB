import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SidebarService,
  EventoService
 } from './servicio.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SidebarService,
    EventoService
  ],
  declarations: [],
  
})
export class ServicioModule { }
