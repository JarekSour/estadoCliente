import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', loadChildren: 'app/components/login/login.module#LoginModule' },
    { path: 'home', loadChildren: 'app/components/home/home.module#HomeModule' },
    { path: 'refresh', loadChildren: 'app/components/refresh/refresh.module#RefreshModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
