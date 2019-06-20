import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTES } from './app.routes';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

// Módulos
import { ComponentesModule } from './componentes/componentes.module';

// Servicios
import { ServicioModule } from './servicios/servicio.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTES,
    ComponentesModule,
    ServicioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
