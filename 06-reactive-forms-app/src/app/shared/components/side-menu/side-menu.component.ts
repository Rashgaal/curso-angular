import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  title: string;
  route: string;
}

// nos interesa la primera ruta que es el path vacio que nos lleva a basic
const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {

  reactiveMenu: MenuItem[] = reactiveItems
    .filter(item => item.path !== '**')
    .map(item => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`,
    }));

  authMenu: MenuItem[] = [{
    title: 'Registro',
    route: './auth',
  }];

  countryMenu: MenuItem[] = [{
    title: 'Países',
    route: './country',
  }];
}
