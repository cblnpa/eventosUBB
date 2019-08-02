import { Time } from '@angular/common';

export class actividad {
    constructor(
        public nombreActividad: string,
        public horaInicioActividad: Time,
        public horaFinActividad: Time,
        public ubicacionActividad: string,
        public descripcionActividad: string,
        public jornada_idJornada: number,
        public expositor_idExpositor: number
    ){}
}