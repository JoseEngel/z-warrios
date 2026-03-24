import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
    },
    {
        path: 'warriors',
        loadChildren: () => import('./Warriors-front/warriors-front.routes')
        .then(m => m.warriorsRoutes),
    },
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'auth/login',
    }
];
