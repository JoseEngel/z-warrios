import { Routes } from '@angular/router';

/*export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes'),
    },
    {
        path: 'warriors',
        loadChildren: () => import('./Warriors-front/warriors-front.routes'),
    },
    {
        path: '',
        redirectTo: 'warriors/characters',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'warriors/characters',
    }
];*/
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
    // 🔥 IMPORTANTE: ahora el inicio es login
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
