import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Formularios
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule, MatInputModule, MatCardModule, MatButtonModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatNativeDateModule,MatRippleModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Módulos
import { UtilidadesModule } from '../utilidades/utilidades.module';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';

// uploader
import { AngularFileUploaderModule } from "angular-file-uploader";

// Componentes
import { InicioComponent } from './inicio/inicio.component';
import { EventosDetallesComponent } from '../componentes/eventos/eventos-detalles/eventos-detalles.component';
import { ComponentesComponent } from './componentes.component';
import { EventosEditarComponent } from './eventos/eventos-editar/eventos-editar.component';
import { EditLoginComponent } from './edit-login/edit-login.component';
import { EventosMisEventosComponent } from './eventos/eventos-mis-eventos/eventos-mis-eventos.component';
import { EventosCrearComponent } from './eventos/eventos-crear/eventos-crear.component';
import { EventosDetallesPublicComponent } from './eventos/eventos-detalles-public/eventos-detalles-public.component';

//Rutas
import { COMPONENTES_ROUTES } from './componentes.routes';

@NgModule({
    declarations: [
        ComponentesComponent,
        EventosDetallesComponent,
        EventosEditarComponent,
        EditLoginComponent,
        InicioComponent,
        EventosMisEventosComponent,
        EventosCrearComponent,
        EventosDetallesPublicComponent
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
        EventosDetallesPublicComponent
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
        COMPONENTES_ROUTES
    ]
})
export class ComponentesModule {}
