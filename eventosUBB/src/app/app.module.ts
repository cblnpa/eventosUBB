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
import { EditLoginComponent } from './login/edit-login/edit-login.component';

// Módulos
import { ComponentesModule } from './componentes/componentes.module';

// Servicios
import { ServicioModule } from './servicios/servicio.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EditLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTES,
    ComponentesModule,
    ServicioModule,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
