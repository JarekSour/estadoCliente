import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NavModule } from '../nav/nav.module';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        NavModule,
        MaterialModule,
        FormsModule,
        DropzoneModule
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-Es' }],
    declarations: [HomeComponent]
})
export class HomeModule { }
