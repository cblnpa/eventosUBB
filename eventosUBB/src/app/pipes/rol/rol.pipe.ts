import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rol'
})
export class RolPipe implements PipeTransform {

  public nombreRol: string;

  transform(rol: number): any {
    if (rol == 1) {
      this.nombreRol = 'Encargado';
      return this.nombreRol;
    } else if (rol == 3) {
      this.nombreRol = 'Comisión';
      return this.nombreRol;
    }
  }

}
