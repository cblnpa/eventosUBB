import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Rutas
import { APP_ROUTES } from './app.routes';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

// Módulos
import { ComponentesModule } from './componentes/componentes.module';

// Servicios
import { ServicioModule } from './servicios/servicio.module';
import { RegisterComponent } from './login/register.component';
import { PruebasEventoComponent } from './pruebas-evento/pruebas-evento.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PruebasEventoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTES,
    ComponentesModule,
    ServicioModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
