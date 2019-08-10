import { NgModule } from '@angular/core';
import { HttpClientModule,  HttpClientJsonpModule } from '@angular/common/http';

//Rutas
import { COMPONENTES_ROUTES } from './componentes.routes';

// Módulos
import { UtilidadesModule } from '../utilidades/utilidades.module';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';

// Componentes
import { InicioComponent } from './inicio/inicio.component';
import { EventosDetallesComponent } from '../componentes/eventos/eventos-detalles/eventos-detalles.component';
import { ComponentesComponent } from './componentes.component';
import { EventosEditarComponent } from './eventos/eventos-editar/eventos-editar.component';
import { EditLoginComponent } from './edit-login/edit-login.component';
import { EventosMisEventosComponent } from './eventos/eventos-mis-eventos/eventos-mis-eventos.component';
import { EventosCrearComponent } from './eventos/eventos-crear/eventos-crear.component';
import { EventosDetallesPublicComponent } from './eventos/eventos-detalles-public/eventos-detalles-public.component';
import { UnidadesCrearComponent } from './unidades/unidades-crear/unidades-crear.component';
import { UnidadesVerComponent } from './unidades/unidades-ver/unidades-ver.component';
import { ReportesGenerarComponent } from './reportes/reportes-generar/reportes-generar.component';
import { ComisionVerComponent } from './comisiones/comision-ver/comision-ver.component';
import { ComisionCrearComponent } from './comisiones/comision-crear/comision-crear.component';
import { ModalJornadaAddComponent } from './modals/modal-jornada-add/modal-jornada-add.component';
import { ModalExpositorAddComponent } from './modals/modal-expositor-add/modal-expositor-add.component';
import { ModalMaterialAddComponent } from './modals/modal-material-add/modal-material-add.component';
import { ModalColaboradorAddComponent } from './modals/modal-colaborador-add/modal-colaborador-add.component';
import { ModalActividadAddComponent } from './modals/modal-actividad-add/modal-actividad-add.component';

// Formularios
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//Angular material
import { MatStepperModule, MatInputModule, MatCardModule, MatButtonModule } from '@angular/material'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule,MatRippleModule } from '@angular/material/core';

// Librerías
//Botón compartir
import { ShareButtonModule } from '@ngx-share/button';
import { ShareButtonsModule } from '@ngx-share/buttons';
//Selector múltiple con buscador
import { SelectDropDownModule } from 'ngx-select-dropdown'
// uploader
import { AngularFileUploaderModule } from "angular-file-uploader";

//Pipes
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    declarations: [
        ComponentesComponent,
        EventosDetallesComponent,
        EventosEditarComponent,
        EditLoginComponent,
        InicioComponent,
        EventosMisEventosComponent,
        EventosCrearComponent,
        EventosDetallesPublicComponent,
        UnidadesCrearComponent,
        UnidadesVerComponent,
        ReportesGenerarComponent,
        ComisionVerComponent,
        ComisionCrearComponent,
        ModalJornadaAddComponent,
        ModalExpositorAddComponent,
        ModalActividadAddComponent,
        ModalMaterialAddComponent,
        ModalColaboradorAddComponent
    ],
    //exports es para poder utilizar estos componentes fuera de esta carpeta 
    exports: [
        ComponentesComponent,
        EventosDetallesComponent,
        EventosEditarComponent,
        EditLoginComponent,
        InicioComponent,
        EventosMisEventosComponent,
        EventosCrearComponent,
        EventosDetallesPublicComponent,
        UnidadesCrearComponent,
        UnidadesVerComponent,
        ReportesGenerarComponent,
        ComisionVerComponent,
        ComisionCrearComponent,
        ModalJornadaAddComponent,
        ModalExpositorAddComponent,
        ModalActividadAddComponent,
        ModalMaterialAddComponent,
        ModalColaboradorAddComponent
    ],
    //acá se agregan los módulos de utilidades, ya que estos se utilizan en componentes.component.html
    imports: [
        UtilidadesModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatStepperModule, 
        MatInputModule, 
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        HttpClientModule,
        MatNativeDateModule,
        MatRippleModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        AngularFileUploaderModule,
        NgxPaginationModule,
        SelectDropDownModule,
        ShareButtonModule,
        ShareButtonsModule,
        HttpClientJsonpModule,
        PipesModule,
        COMPONENTES_ROUTES
    ]
})
export class ComponentesModule {}
