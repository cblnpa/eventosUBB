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
        { titulo: 'Ver eventos', url: '/inicio'},
        { titulo: 'Mis eventos', url: '/misEventos'},
        { titulo: 'Crear evento', url: '/crearEvento'},
      ]
    }
  ];

  constructor() { }
}
