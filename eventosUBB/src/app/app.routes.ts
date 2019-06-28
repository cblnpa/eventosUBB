import { Routes, RouterModule } from '@angular/router';

import { NotfoundComponent } from './utilidades/notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { LogoutComponent } from './login/logout.component';
import { PruebasEventoComponent } from './pruebas-evento/pruebas-evento.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent, data: { titulo: 'Iniciar sesión' } },
    { path: 'register', component: RegisterComponent, data: { titulo: 'Regístrate' }  },
    { path: 'logout', component: LogoutComponent },
    { path: 'pruebasEventos', component: PruebasEventoComponent},
    { path: '**', component: NotfoundComponent}
];
export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true });

