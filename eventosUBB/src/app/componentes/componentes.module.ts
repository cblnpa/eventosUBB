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
    ComisionCrearComponent, GenerarUtilidadesComponent, FormularioUtilidadesComponent,
    ProgramaComponent, TablaJornadaComponent, TablaExpositorComponent, TablaActividadComponent,
    TablaColaboradorComponent, TablaMaterialComponent, EventosAdministrarComponent,
    EventosInscritosComponent
} from '../componentes/componentes.index';

// Componentes modals
import {
    ModalActividadAddComponent, ModalActividadEditComponent, ModalColaboradorAddComponent,
    ModalColaboradorEditComponent, ModalExpositorAddComponent, ModalExpositorEditComponent,
    ModalJornadaAddComponent, ModalJornadaEditComponent, ModalMaterialAddComponent,
    ModalMaterialEditComponent, ModalRepositorioAddComponent, ModalRepositorioEditComponent
} from '../componentes/modals/modals.index';

// Formularios
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Angular material
import {
    MatStepperModule, MatInputModule, MatCardModule, MatButtonModule, MatPaginatorModule,
    MatSortModule, MatTableModule, MatSelectModule, MatProgressSpinnerModule,
    MatProgressBarModule, MatNativeDateModule, MatRippleModule, MatTooltipModule
} from '@angular/material'

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

//Generador de utilidades
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
    declarations: [
        //Componentes
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
        GenerarUtilidadesComponent,
        FormularioUtilidadesComponent,
        ProgramaComponent,
        EventosAdministrarComponent,
        EventosInscritosComponent,

        //Componentes modals
        ModalActividadAddComponent,
        ModalActividadEditComponent,
        ModalColaboradorAddComponent,
        ModalColaboradorEditComponent,
        ModalExpositorAddComponent,
        ModalExpositorEditComponent,
        ModalJornadaAddComponent,
        ModalJornadaEditComponent,
        ModalMaterialAddComponent,
        ModalMaterialEditComponent,
        ModalRepositorioAddComponent,
        ModalRepositorioEditComponent,

        //Componentes tablas
        TablaJornadaComponent,
        TablaExpositorComponent,
        TablaActividadComponent,
        TablaColaboradorComponent,
        TablaMaterialComponent,
        EventosInscritosComponent,
        EventosAdministrarComponent,
    ],
    //exports es para poder utilizar estos componentes fuera de esta carpeta 
    exports: [
        ComponentesComponent,
        EventosDetallesComponent,
        EventosEditarComponent,
        EventosAdministrarComponent,
        EventosInscritosComponent,
        EditLoginComponent,
        InicioComponent,
        EventosMisEventosComponent,
        EventosCrearComponent,
        EventosDetallesPublicComponent,
        UnidadesCrearComponent,
        UnidadesVerComponent,
        ReportesGenerarComponent,
        ComisionVerComponent,
        ComisionCrearComponent
    ],
    //acá se agregan los módulos de utilidades, ya que estos se utilizan en componentes.component.html
    imports: [
        UtilidadesModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatCardModule,
        MatNativeDateModule,
        MatRippleModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatTooltipModule,
        FormsModule,
        AngularFileUploaderModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        ShareButtonsModule,
        ShareButtonModule,
        SelectDropDownModule,
        PipesModule,
        ColorPickerModule,
        COMPONENTES_ROUTES
    ]
})
export class ComponentesModule { }
