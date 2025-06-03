import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    // lazyLoad con promesa
    // loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component').then(
    //   (c) => c.DashboardPageComponent
    // ),
    //CTRL+click cuando falla
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component'),
    // rutas hijas para llegar a ellas con (slash) /trending...
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page.component'),
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page.component'),
      },
      {
        path: 'history/:query',//o key, pero si lo cambiamos es lo que saldra por consola
        loadComponent: () => import('./gifs/pages/gif-history/gif-history.component'),
      },
      {
        path: '**',
        redirectTo: 'trending',
      },
    ]
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
