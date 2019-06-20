import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      //Menu encargado
      titulo: 'Eventos',
      icono: 'mdi mdi-view-grid',
      submenu: [
        { titulo: 'Ver eventos', url: '/inicioEncargado'},
        { titulo: 'Detalles evento', url: '/eventosDetalles'},
        { titulo: 'Editar evento', url: '/eventosEditar'}
      ]
    }
  ];

  constructor() { }
}
