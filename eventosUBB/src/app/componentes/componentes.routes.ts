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
            { path: 'inicioEncargado', component: InicioEncargadoComponent, data: { titulo: 'Inicio encargado' } },
            { path: 'eventosDetalles', component: EventosDetallesComponent, data: { titulo: 'Detalles evento' } },
            { path: 'eventosEditar', component: EventosEditarComponent, data: { titulo: 'Modificar evento' } },
            { path: '', redirectTo: '/inicioEncargado', pathMatch: 'full'}
        ]
    }
];
// Rutas hijas
export const COMPONENTES_ROUTES = RouterModule.forChild(componentesRoutes);
