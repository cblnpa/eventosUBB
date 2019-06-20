import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentesComponent } from './componentes.component';
import { InicioEncargadoComponent } from './encargado/inicio-encargado/inicio-encargado.component';
import { EventosDetallesComponent } from './eventos/eventos-detalles/eventos-detalles.component';
import { EventosEditarComponent } from './eventos/eventos-editar/eventos-editar.component';

const componentesRoutes: Routes = [
    {
        path: '',
        component: ComponentesComponent,
        children: [
            { path: 'inicioEncargado', component: InicioEncargadoComponent},
            { path: 'eventosDetalles', component: EventosDetallesComponent},
            { path: 'eventosEditar', component: EventosEditarComponent},
            { path: '', redirectTo: '/inicioEncargado', pathMatch: 'full'}
        ]
    }
];
// Rutas hijas
export const COMPONENTES_ROUTES = RouterModule.forChild(componentesRoutes);
