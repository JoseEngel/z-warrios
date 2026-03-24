import { Routes } from "@angular/router";
import { WarriorsFrontLayouts } from "./layouts/warriors-front-layouts/warriors-front-layouts";
import { HomePage } from "./pages/home-page/home-page";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { StatisticsPage } from "./pages/statistics-page/statistics-page";
import { authGuard } from "@/auth/guards/auth.guard";

/*export const warriorsFrontRoutes: Routes = [
    {
        path: '',
        component: WarriorsFrontLayouts,
        children: [
            {
                path: '',
                redirectTo: 'characters',
                pathMatch: 'full'
            },
            {
                path: 'characters',
                component: HomePage,
            },
            {
                path: 'statistics',
                component: StatisticsPage,
            },
            {
                path: '**',
                component: NotFoundPage,
            }
        ],
    },
    {
        path: '**',
        redirectTo: '',
    }
];
export default warriorsFrontRoutes;*/

export const warriorsRoutes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./layouts/warriors-front-layouts/warriors-front-layouts').then(m => m.WarriorsFrontLayouts),

        children: [
            {
                path: '',
                redirectTo: 'characters',
                pathMatch: 'full'
            },
            {
                path: 'characters',
                loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage)
            },
            {
                path: 'statistics',
                component: StatisticsPage,
            },
            {
                path: '**',
                component: NotFoundPage,
            }
        ]
    }
];