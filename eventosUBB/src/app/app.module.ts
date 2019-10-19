import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatStepperModule, MatInputModule, MatCardModule, MatButtonModule } from '@angular/material'
import { MatIconModule } from '@angular/material/icon';

// uploader
import { AngularFileUploaderModule } from "angular-file-uploader";

// sweet alert 2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Rutas
import { APP_ROUTES } from './app.routes';

// Componentes
import { AppComponent } from './app.component';
import { RegisterComponent } from './login/register.component';
import { LoginComponent } from './login/login.component';
import { RecuperarPassComponent } from './login/recuperar-pass.component';
import { CambioPassComponent } from './login/cambio-pass.component';

// Módulos
import { ComponentesModule } from './componentes/componentes.module';

// Servicios
import { ServicioModule } from './servicios/servicio.module';

//Localización DatePipe
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsCL from '@angular/common/locales/es-CL';

registerLocaleData(localeEsCL, 'es-CL');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecuperarPassComponent,
    CambioPassComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTES, /* importa rutas hijas de todo el proyecto */ 
    ComponentesModule, /* importa los modulos importados dentro del componente de la carpeta componentes */ 
    ServicioModule, /* importa los servicios utilizados en el proyecto */ 
    HttpClientModule,
    MatStepperModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    AngularFileUploaderModule,
    MatIconModule,
    SweetAlert2Module
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
