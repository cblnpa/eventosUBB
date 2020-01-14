import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actividadParalela'
})
export class ActividadParalelaPipe implements PipeTransform {

  public esActividadParalela: string;

  transform(actividadParalela: number): any {
    if (actividadParalela == 1)
      this.esActividadParalela = 'Sí';
    else
      this.esActividadParalela = 'No';
    return this.esActividadParalela;
  }

}
