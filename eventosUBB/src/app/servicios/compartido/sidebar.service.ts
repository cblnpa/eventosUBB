import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      //Eventos 
      titulo: 'Eventos',
      icono: 'mdi mdi-view-grid',
      submenu: [
        { titulo: 'Ver eventos', url: '/inicio' },
        { titulo: 'Mis eventos', url: '/misEventos' },
        { titulo: 'Crear evento', url: '/crearEvento' },
      ]
    },
    {
      //Unidades
      titulo: 'Unidades',
      icono: 'mdi mdi-city',
      submenu: [
        { titulo: 'Ver unidades', url: '' },
        { titulo: 'Agregar unidad', url: '' }
      ]
    },
    {
      //Reportes
      titulo: 'Reportes',
      icono: 'mdi mdi-file-document'
    },
    {
      //Comisión
      titulo: 'Comisión',
      icono: 'mdi mdi-account-multiple',
      submenu: [
        { titulo: 'Ver comisiones', url: '' },
        { titulo: 'Agregar comisión', url:'' }
      ]
    }
  ];

  constructor() { }
}
