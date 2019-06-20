import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SidebarService
 } from './servicio.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SidebarService
  ],
  declarations: [],
  
})
export class ServicioModule { }
