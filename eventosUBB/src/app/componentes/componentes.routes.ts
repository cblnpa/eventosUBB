import { Routes, RouterModule } from '@angular/router';

import { ComponentesComponent } from './componentes.component';

import {
    LoginComponent, EditLoginComponent, InicioComponent, EventosDetallesComponent,
    EventosEditarComponent, EventosCrearComponent, GenerarUtilidadesComponent,
    EventosDetallesPublicComponent, ProgramaComponent, UnidadesCrearComponent,
    UnidadesVerComponent, ReportesGenerarComponent, ComisionVerComponent, ComisionCrearComponent,
    FormularioUtilidadesComponent, EventosAdministrarComponent, EventosInscritosComponent,
    FormularioComponent, AcreditacionComponent, GenerarUtilidades2Component
} from '../componentes/componentes.index';

import { LoginGuard } from '../servicios/guards/login.guard';

const componentesRoutes: Routes = [
    { path: '', component: LoginComponent, data: { titulo: 'Iniciar sesión' } },
    {
        path: '',
        component: ComponentesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'inicio', component: InicioComponent, data: { titulo: 'Inicio' } },
            { path: 'eventoDetalle/:id', component: EventosDetallesComponent, data: { titulo: 'Detalles del evento' } },
            { path: 'programa/:id', component: ProgramaComponent, data: { titulo: 'Generar programa' } },
            { path: 'eventosInscritos', component: EventosInscritosComponent, data: { titulo: 'Eventos inscritos' } },
            { path: 'adminEventos', component: EventosAdministrarComponent, data: { titulo: 'Administrar eventos' } },
            { path: 'crearEvento', component: EventosCrearComponent, data: { titulo: 'Crear nuevo evento' } },
            { path: 'eventosEditar/:id/:idUsuario', component: EventosEditarComponent, data: { titulo: 'Editar el evento' } },
            { path: 'editLogin', component: EditLoginComponent, data: { titulo: 'Editar mi perfil' } },
            { path: 'crearUnidad', component: UnidadesCrearComponent, data: { titulo: 'Crear' } },
            { path: 'editarUnidad/:id', component: UnidadesCrearComponent, data: { titulo: 'Editar' } },
            { path: 'verUnidades', component: UnidadesVerComponent, data: { titulo: 'Unidades y ayudantes' } },
            { path: 'reportes', component: ReportesGenerarComponent, data: { titulo: 'Reportes' } },
            { path: 'verComisiones', component: ComisionVerComponent, data: { titulo: 'Comisiones' } },
            { path: 'crearComision', component: ComisionCrearComponent, data: { titulo: 'Crear comisión' } },
            { path: 'eventoDetallePublic/:id', component: EventosDetallesPublicComponent, data: { titulo: 'Detalles del evento' } },
            { path: 'generarUtilidades', component: FormularioUtilidadesComponent, data: { titulo: 'Generar utilidades para el evento' } },
            { path: 'generarUtilidades/:id/:tipo', component: GenerarUtilidadesComponent, data: { titulo: 'Generar utilidades para el evento' } },
            { path: 'generarUtilidades2/:id/:tipo', component: GenerarUtilidades2Component, data: { titulo: 'Generar utilidades para el evento' } },
            { path: 'eventoAcreditar', component: FormularioComponent, data: { titulo: 'Evento a acreditar' } },
            { path: 'acreditar/:idEvento', component: AcreditacionComponent, data: { titulo: 'Acreditar participantes' } },
        ]
    }
];
// Rutas hijas
export const COMPONENTES_ROUTES = RouterModule.forChild(componentesRoutes);
