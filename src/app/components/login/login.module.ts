import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { NavModule } from '../nav/nav.module';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        NavModule,
        MaterialModule,
        FormsModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
