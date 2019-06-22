// export class evento {
//     idEvento?: number;
//     nombre: string;
//     ubicacion: string;
//     direccion: string;
//     detalles: string;
//     imagen: string;
//     capacidad: number;
// }

export class evento {
    constructor(
        public nombre: string,
        public ubicacion: string,
        public direccion: string,
        public detalles: string,
        public imagen: string,
        public capacidad: number
    ){}
}