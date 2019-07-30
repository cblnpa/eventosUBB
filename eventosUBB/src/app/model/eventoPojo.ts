import { Time } from '@angular/common';

export class eventoPojo {
    constructor(
        public nombreEvento: string,
        public ubicacion: string,
        public direccion: string,
        public detalles: string,
        public imagen: string,
        public capacidad: number,
        public nombreEventoInterno: string,
        public ciudad_idCiudad: number,

        public nombreMaterial: string,
        public archivo: string,

        public nombreColaborador: string,
        public nombreRepresentante: string,
        public telefonoColaborador: number,
        public correoColaborador: string,
        public sitioWeb: string,
        public logo: string,

        public nombreJornada: string,
        public fechaJornada: Date,
        public horaInicioJornada: Time,
        public horaFinJornada: Time,
        public ubicacionJornada: string,
        public descripcionJornada: string,

        public nombreExpositor: string,
        public apellidoExpositor: string,
        public sexo: string,
        public correoExpositor: string,
        public empresa: string,
        public foto: string,

        public nombreActividad: string,
        public horaInicioActividad: Time,
        public horaFinActividad: Time,
        public ubicacionActividad: string,
        public descripcionActividad: string,

        public visibilidad: string,

        public email: string
    ){}
}