import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoEvento'
})
export class EstadoEventoPipe implements PipeTransform {

  public tipoEstado: string; 

  transform(estado: number): any {

    if(estado == 1){
      this.tipoEstado = 'Activo';
      return this.tipoEstado;
    } else {
      this.tipoEstado = 'No disponible'
      return this.tipoEstado;
    }
  }

}
