import { Routes, RouterModule } from '@angular/router';

import { ComponentesComponent } from './componentes.component';

import { InicioComponent } from './inicio/inicio.component';
import { EventosDetallesComponent } from './eventos/eventos-detalles/eventos-detalles.component';
import { EventosEditarComponent } from './eventos/eventos-editar/eventos-editar.component';

const componentesRoutes: Routes = [
    {
        path: '',
        component: ComponentesComponent,
        children: [
            { path: 'inicio', component: InicioComponent , data: { titulo: 'Inicio' } },
            { path: 'eventosDetalles', component: EventosDetallesComponent, data: { titulo: 'Detalles evento' } },
            { path: 'eventosEditar', component: EventosEditarComponent, data: { titulo: 'Modificar evento' } },
            // { path: '', component: , data: { titulo: 'Crear evento' } },
            // { path: '', component: , data: { titulo: 'Generar reportes '} },
            // { path: '', component: , data: {titulo: 'Ver encargados' } },
            // { path: '', component: , data: { titulo: 'Agregar encargados' } },
            { path: '', redirectTo: '/login', pathMatch: 'full'},
        ]
    }
];
// Rutas hijas
export const COMPONENTES_ROUTES = RouterModule.forChild(componentesRoutes);
