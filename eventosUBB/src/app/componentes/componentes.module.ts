import { NgModule } from '@angular/core';

// Módulos
import { UtilidadesModule } from '../utilidades/utilidades.module';

// Componentes
import { InicioEncargadoComponent } from '../componentes/encargado/inicio-encargado/inicio-encargado.component';
import { EventosDetallesComponent } from '../componentes/eventos/eventos-detalles/eventos-detalles.component';
import { ComponentesComponent } from './componentes.component';
import { EventosEditarComponent } from './eventos/eventos-editar/eventos-editar.component';

@NgModule({
    declarations: [
        ComponentesComponent,
        InicioEncargadoComponent,
        EventosDetallesComponent,
        EventosEditarComponent,
        ],
    //exports es para poder utilizar estos componentes fuera de esta carpeta 
    exports: [
        ComponentesComponent,
        InicioEncargadoComponent,
        EventosDetallesComponent
    ],
    //acá se agregan los módulos de utilidades, ya que estos se utilizan en componentes.component.html
    imports: [
        UtilidadesModule
    ]
})
export class ComponentesModule {}
