import { NgModule } from '@angular/core';

import { ImagenPipe } from './imagen/imagen.pipe';
import { EstadoEventoPipe } from './estado_evento/estado-evento.pipe';

@NgModule({
  declarations: [
    ImagenPipe,
    EstadoEventoPipe
  ],
  imports: [],
  exports: [
    ImagenPipe,
    EstadoEventoPipe
  ]
})
export class PipesModule { }
