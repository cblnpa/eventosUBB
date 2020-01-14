import { NgModule } from '@angular/core';

import { ImagenPipe } from './imagen/imagen.pipe';
import { EstadoEventoPipe } from './estado_evento/estado-evento.pipe';
import { RolPipe } from './rol/rol.pipe';
import { CambiarHoraPipe } from './cambiar_hora/cambiar-hora.pipe';
import { ActividadParalelaPipe } from './actividad_paralela/actividad-paralela.pipe';

@NgModule({
  declarations: [
    ImagenPipe,
    EstadoEventoPipe,
    RolPipe,
    CambiarHoraPipe,
    ActividadParalelaPipe
  ],
  imports: [],
  exports: [
    ImagenPipe,
    EstadoEventoPipe,
    RolPipe,
    CambiarHoraPipe,
    ActividadParalelaPipe
  ]
})
export class PipesModule { }
