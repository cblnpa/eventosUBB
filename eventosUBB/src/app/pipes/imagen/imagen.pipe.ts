import { Pipe, PipeTransform } from '@angular/core';
import { global } from '../../servicios/global';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  public url = global.url; 

  //Recibe una imagen. Tipo define que usuario es la imagen por defecto a transformar con pipe
  transform(img: string, tipo: string = 'usuario'): any {

    //retorna la url de la imagen 
    let varUrl = this.url+'user/avatar/' + img;

    return varUrl;
  }

}
