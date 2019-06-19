import { NgModule } from '@angular/core';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        BreadcrumsComponent,
        FooterComponent,
        HeaderComponent,
        NotfoundComponent,
        SidebarComponent
    ],
    exports: [
        BreadcrumsComponent,
        FooterComponent,
        HeaderComponent,
        NotfoundComponent,
        SidebarComponent
    ]
})

export class UtilidadesModule {}