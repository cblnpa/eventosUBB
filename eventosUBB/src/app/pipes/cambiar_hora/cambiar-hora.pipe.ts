import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '@angular/common';

@Pipe({
  name: 'cambiarHora'
})
export class CambiarHoraPipe implements PipeTransform {

  public horaFinal;
  public arrHora;
  public auxHora;

  transform(hora: Time): any {
    this.arrHora = hora;
    this.auxHora = this.arrHora.split(':');
    this.horaFinal = this.auxHora[0] + ':' + this.auxHora[1];
    return this.horaFinal;
  }

}
