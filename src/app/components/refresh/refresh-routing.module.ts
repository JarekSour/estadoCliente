import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { RefreshComponent } from './refresh/refresh.component';

const routes: Routes = [
    { path: '', component: RefreshComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RefreshRoutingModule { }
