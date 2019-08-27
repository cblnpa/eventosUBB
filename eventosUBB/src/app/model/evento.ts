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
        public categoria_idCategoria: number,
        public visibilidad: number,
        public tipoEvento_idtipoEvento: number,
        public idEvento?: number
    ){}
}