import { Routes, RouterModule } from '@angular/router';

import { ComponentesComponent } from './componentes.component';

import { InicioComponent } from './inicio/inicio.component';
import { EventosDetallesComponent } from './eventos/eventos-detalles/eventos-detalles.component';
import { EventosEditarComponent } from './eventos/eventos-editar/eventos-editar.component';
import { LoginComponent } from '../login/login.component';
import { EditLoginComponent } from '../componentes/edit-login/edit-login.component';
import { EventosMisEventosComponent } from './eventos/eventos-mis-eventos/eventos-mis-eventos.component';

const componentesRoutes: Routes = [
    { path: '', component: LoginComponent, data: { titulo: 'Iniciar sesión'}},
    {
        path: '',
        component: ComponentesComponent,
        children: [
            { path: 'inicio', component: InicioComponent , data: { titulo: 'Inicio' } },
            { path: 'eventoDetalle/:id', component: EventosDetallesComponent, data: { titulo: 'Detalles evento' } },
            { path: 'misEventos', component: EventosMisEventosComponent, data: { titulo: 'Mis eventos' } },
            { path: 'eventosEditar', component: EventosEditarComponent, data: { titulo: 'Editar evento' } },
            { path: 'editLogin', component: EditLoginComponent, data: { titulo: 'Editar Perfil' }  },

            // { path: '', component: , data: { titulo: 'Crear evento' } },
            // { path: '', component: , data: { titulo: 'Generar reportes '} },
            // { path: '', component: , data: {titulo: 'Ver encargados' } },
            // { path: '', component: , data: { titulo: 'Agregar encargados' } },
        ]
    }
];
// Rutas hijas
export const COMPONENTES_ROUTES = RouterModule.forChild(componentesRoutes);
