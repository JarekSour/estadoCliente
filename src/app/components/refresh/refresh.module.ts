import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefreshRoutingModule } from './refresh-routing.module';
import { RefreshComponent } from './refresh/refresh.component';

@NgModule({
    imports: [
        CommonModule,
        RefreshRoutingModule
    ],
    declarations: [RefreshComponent]
})
export class RefreshModule { }
