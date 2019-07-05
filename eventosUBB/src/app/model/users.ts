export class users {
    
    constructor(
        public nombreUsuario: string,
        public apellidoUsuario: string,
        public email: string,
        public password: string,
        public avatar: string,
        public perfil_idPerfil: number,
        public id?: number
    ){} 
}