import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';

import { routes } from '../../../app.routes';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  router = inject(Router);

  routes = routes.map(route => ({
    path: route.path,
    title: `${route.title ?? 'Maps en Angular'}`,
  })).filter(route => route.path !== '**')

  // obejto tipo subscribe u obsarvable
  pageTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    // tap(event => console.log(event)),  //esto dispara un monton de cosas pero vamos a encadenar pasos en en observable
    map(event => event.url),
    map(url => routes.find(route => `/${route.path}` === url)?.title ?? 'Mapas'),

  );

  //lo mismo de arriba pero como señal
  pageTitle = toSignal(
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      // tap(event => console.log(event)),  //esto dispara un monton de cosas pero vamos a encadenar pasos en en observable
      map(event => event.url),
      map(url => routes.find(route => `/${route.path}` === url)?.title ?? 'Mapas'),
    )
  );

}
