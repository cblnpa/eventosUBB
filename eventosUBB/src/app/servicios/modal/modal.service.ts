import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public oculto: string = '';

  constructor() { }

  ocultarModal() {
    this.oculto = '';
  }

  salirModal() {
    Swal.fire({
      title: '¿Está seguro que desea salir?',
      text: "Perderás toda la información agregada en este formulario.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#03C303',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, quiero salir',
      cancelButtonText: 'No, no quiero salir'
    }).then((result) => {
      if (result.value) {
        this.oculto='';
      }
    })
  }

  mostrarModal() {
    this.oculto = 'block';
  }
}
