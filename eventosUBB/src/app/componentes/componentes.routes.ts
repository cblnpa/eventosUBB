import { Routes, RouterModule } from '@angular/router';

import { ComponentesComponent } from './componentes.component';

import { LoginComponent, EditLoginComponent, InicioComponent, EventosDetallesComponent,
        EventosEditarComponent, EventosMisEventosComponent, EventosCrearComponent, 
        GenerarUtilidadesComponent, EventosDetallesPublicComponent, 
        UnidadesCrearComponent, UnidadesVerComponent, ReportesGenerarComponent, 
        ComisionVerComponent, ComisionCrearComponent, FormularioUtilidadesComponent } from '../componentes/componentes.index';

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
            { path: 'crearUnidad', component: UnidadesCrearComponent, data: { titulo: 'Crear' } },
            { path: 'verUnidades', component: UnidadesVerComponent, data: { titulo: 'Unidades' } },
            { path: 'reportes', component: ReportesGenerarComponent, data: { titulo: 'Reportes' } },
            { path: 'verComisiones', component: ComisionVerComponent, data: { titulo: 'Comisiones' } },
            { path: 'crearComision', component: ComisionCrearComponent, data: { titulo: 'Crear nueva comisión' } },
            { path: 'eventoDetallePublic/:id', component: EventosDetallesPublicComponent, data: { titulo: 'Detalles del evento' } },
            { path: 'generarUtilidades', component: FormularioUtilidadesComponent, data: { titulo: 'Generar utilidades para el evento' } },
            { path: 'generarUtilidades/:id/:tipo', component: GenerarUtilidadesComponent, data: { titulo: 'Generar utilidades para el evento' } },   
        ]
    }
];
// Rutas hijas
export const COMPONENTES_ROUTES = RouterModule.forChild(componentesRoutes);
