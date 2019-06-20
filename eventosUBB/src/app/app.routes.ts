import { Routes, RouterModule } from '@angular/router';

import { NotfoundComponent } from './utilidades/notfound/notfound.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: '**', component: NotfoundComponent}
];
export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true });

