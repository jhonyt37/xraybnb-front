import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AuthGuard } from './guard/auth-guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'iniciar-sesion',
                loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
            },
            {
                path: 'registrarme',
                loadChildren: () => import('./auth/register-candidate/register-candidate.module').then(m => m.RegisterCandidateModule)
            },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
