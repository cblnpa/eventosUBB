import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
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