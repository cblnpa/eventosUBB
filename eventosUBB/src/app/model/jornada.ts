import { Time } from '@angular/common';

export class jornada {
    constructor(
        public nombreJornada: string,
        public fechaJornada: Date,
        public horaInicioJornada: Time,
        public horaFinJornada: Time,
        public ubicacionJornada: string,
        public descripcionJornada: string,
        public evento_idEvento?: number,
        public idJornada?: number
    ){}
}