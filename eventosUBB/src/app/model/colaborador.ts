export class colaborador {
    constructor(
        public nombreColaborador: string,
        public nombreRepresentante: string,
        public telefonoColaborador: number,
        public correoColaborador: string,
        public sitioWeb: string,
        public logo: string,
        public tipoColaborador_idtipoColaborador: number,
        public evento_idEvento: number,
        public idColaborador?: number
    ){}
}