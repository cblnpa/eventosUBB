export class evento_users {
    constructor(
        public contadorEvento: number,
        public asistencia: number,
        public evento_idEvento: number,
        public rol_idRol?: number,
        public users_id?: number
    ){}
}