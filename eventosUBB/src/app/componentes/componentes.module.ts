import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

//Rutas
import { COMPONENTES_ROUTES } from './componentes.routes';

// Módulos
import { UtilidadesModule } from '../utilidades/utilidades.module';


// Componentes
import {
    ComponentesComponent, EditLoginComponent, InicioComponent, EventosDetallesComponent,
    EventosEditarComponent, EventosMisEventosComponent, EventosCrearComponent, EventosDetallesPublicComponent,
    UnidadesCrearComponent, UnidadesVerComponent, ReportesGenerarComponent, ComisionVerComponent,
    ComisionCrearComponent, SubUnidadesCrearComponent, SubUnidadesVerComponent
} from '../componentes/componentes.index';

import {
    ModalJornadaAddComponent, ModalExpositorAddComponent, ModalMaterialAddComponent,
    ModalColaboradorAddComponent, ModalActividadAddComponent, ModalRepositorioAddComponent
} from '../componentes/modals/modals.index';

// Formularios
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular material
import { MatStepperModule, MatInputModule, MatCardModule, MatButtonModule } from '@angular/material'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

//Botón compartir
import { ShareButtonModule } from '@ngx-share/button';
import { ShareButtonsModule } from '@ngx-share/buttons';
//Selector múltiple con buscador
import { SelectDropDownModule } from 'ngx-select-dropdown'
// uploader
import { AngularFileUploaderModule } from "angular-file-uploader";
//paginación
import { NgxPaginationModule } from 'ngx-pagination';

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
        ModalColaboradorAddComponent,
        ModalRepositorioAddComponent,
        SubUnidadesCrearComponent,
        SubUnidadesVerComponent
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
export class ComponentesModule { }
