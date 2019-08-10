import { Routes, RouterModule } from '@angular/router';

import { ComponentesComponent } from './componentes.component';

import { LoginComponent } from '../login/login.component';
import { EditLoginComponent } from '../componentes/edit-login/edit-login.component';
import { InicioComponent } from './inicio/inicio.component';
import { EventosDetallesComponent } from './eventos/eventos-detalles/eventos-detalles.component';
import { EventosEditarComponent } from './eventos/eventos-editar/eventos-editar.component';
import { EventosMisEventosComponent } from './eventos/eventos-mis-eventos/eventos-mis-eventos.component';
import { EventosCrearComponent } from './eventos/eventos-crear/eventos-crear.component';
import { EventosDetallesPublicComponent } from './eventos/eventos-detalles-public/eventos-detalles-public.component';
import { UnidadesCrearComponent } from './unidades/unidades-crear/unidades-crear.component';
import { UnidadesVerComponent } from './unidades/unidades-ver/unidades-ver.component';
import { ReportesGenerarComponent } from './reportes/reportes-generar/reportes-generar.component';
import { ComisionVerComponent } from './comisiones/comision-ver/comision-ver.component';
import { ComisionCrearComponent } from './comisiones/comision-crear/comision-crear.component';

import { LoginGuard } from '../servicios/guards/login.guard';

const componentesRoutes: Routes = [
    { path: '', component: LoginComponent, data: { titulo: 'Iniciar sesión'}},
    {
        path: '',
        component: ComponentesComponent,
        canActivate: [ LoginGuard ],
        children: [
            { path: 'inicio', component: InicioComponent , data: { titulo: 'Inicio' } },
            { path: 'eventoDetalle/:id', component: EventosDetallesComponent, data: { titulo: 'Detalles del evento' } },
            { path: 'misEventos', component: EventosMisEventosComponent, data: { titulo: 'Mis eventos' } },
            { path: 'crearEvento', component: EventosCrearComponent, data: { titulo: 'Crear nuevo evento' } },
            { path: 'eventosEditar/:id/:idUsuario', component: EventosEditarComponent, data: { titulo: 'Editar el evento' } },
            { path: 'editLogin', component: EditLoginComponent, data: { titulo: 'Editar mi perfil' }  },
            { path: 'crearUnidad', component: UnidadesCrearComponent, data: { titulo: 'Crear nueva unidad' } },
            { path: 'verUnidades', component: UnidadesVerComponent, data: { titulo: 'Unidades' } },
            { path: 'reportes', component: ReportesGenerarComponent, data: { titulo: 'Reportes' } },
            { path: 'verComisiones', component: ComisionVerComponent, data: { titulo: 'Comisiones' } },
            { path: 'crearComision', component: ComisionCrearComponent, data: { titulo: 'Crear nueva comisión' } },
        
            // Para visualizar los detalles del evento (vista para participantes)
            { path: 'eventoDetallePublic/:id', component: EventosDetallesPublicComponent, data: { titulo: 'Detalles del evento' } }

        ]
    }
];
// Rutas hijas
export const COMPONENTES_ROUTES = RouterModule.forChild(componentesRoutes);
