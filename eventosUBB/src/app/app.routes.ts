import { Routes, RouterModule } from '@angular/router';

import { NotfoundComponent } from './utilidades/notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { RecuperarPassComponent } from './login/recuperar-pass.component';
import { CambioPassComponent } from './login/cambio-pass.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent, data: { titulo: 'Iniciar sesión' } },
    { path: 'register', component: RegisterComponent, data: { titulo: 'Regístrate' }  },
    { path: 'recuperarPass', component: RecuperarPassComponent, data: { titulo: 'Recuperar contraseña' }  },
    { path: 'cambioPass/:id', component: CambioPassComponent, data: { titulo: 'Crear nueva contraseña' }  },
    { path: '**', component: NotfoundComponent}
];
export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true });

