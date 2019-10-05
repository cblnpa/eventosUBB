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
    ProgramaComponent, ModalJornadaEditComponent, ModalExpositorEditComponent,
    TablaJornadaComponent, TablaExpositorComponent, TablaActividadComponent } from '../componentes/componentes.index';

import {
    ModalJornadaAddComponent, ModalExpositorAddComponent, ModalMaterialAddComponent,
    ModalColaboradorAddComponent, ModalActividadAddComponent, ModalRepositorioAddComponent
} from '../componentes/modals/modals.index';

// Formularios
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Angular material
import { MatStepperModule, MatInputModule, MatCardModule, MatButtonModule, MatPaginatorModule,
    MatSortModule, MatTableModule, MatSelectModule, MatProgressSpinnerModule,
    MatProgressBarModule, MatNativeDateModule, MatRippleModule} from '@angular/material'

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
        GenerarUtilidadesComponent,
        FormularioUtilidadesComponent,
        ModalJornadaEditComponent,
        ModalExpositorEditComponent,
        ProgramaComponent,
        TablaJornadaComponent,
        TablaExpositorComponent,
        TablaActividadComponent
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
