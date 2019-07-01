import { Routes, RouterModule } from '@angular/router';

import { NotfoundComponent } from './utilidades/notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { EditLoginComponent } from './login/edit-login/edit-login.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent, data: { titulo: 'Iniciar sesión' } },
    { path: 'register', component: RegisterComponent, data: { titulo: 'Regístrate' }  },
    { path: 'edit', component: EditLoginComponent, data: { titulo: 'Editar Perfil' }  },
    { path: '**', component: NotfoundComponent}
];
export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true });

