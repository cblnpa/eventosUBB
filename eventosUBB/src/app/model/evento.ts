export class evento {
    constructor(
        public nombreEvento: string,
        public ubicacion: string,
        public direccion: string,
        public detalles: string,
        public imagen: string,
        public capacidad: number,
        public nombreEventoInterno: string,
        public ciudad_idCiudad: number,
        public visibilidad: number,
        public idEvento?: number
    ){}
}