import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioEncargadoComponent } from './componentes/encargado/inicio-encargado/inicio-encargado.component';
import { NotfoundComponent } from './utilidades/notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { ComponentesComponent } from './componentes/componentes.component';
import { EventosDetallesComponent } from './componentes/eventos/eventos-detalles/eventos-detalles.component';
import { EventosEditarComponent } from './componentes/eventos/eventos-editar/eventos-editar.component';

const routes: Routes = [
  { 
    path: '', 
    component: ComponentesComponent,
    children: [
      { path: 'inicioEncargado', component: InicioEncargadoComponent },
      { path: 'eventosDetalles', component: EventosDetallesComponent },
      { path: 'eventosEditar', component: EventosEditarComponent },
      { path: '', redirectTo: '/inicioEncargado', pathMatch: 'full'},

    ]
  },
  { path: 'login', component: LoginComponent},
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
