export class evento {
    constructor(
        public nombreEvento: string,
        public ubicacion: string,
        public direccion: string,
        public detalles: string,
        public imagen: string,
        public capacidad: number,
        public ciudad_idCiudad: number
    ){}
}