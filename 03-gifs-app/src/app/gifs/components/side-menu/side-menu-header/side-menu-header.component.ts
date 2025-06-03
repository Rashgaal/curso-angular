import { Component } from '@angular/core';
//Este es el tradicinal
// import { environment } from '../../../../../environments/environment';
//En tsconfig.ts añadimos esto o lo que nos intenrese
// "baseUrl": ".",
//     "paths": {
//       "@environments/*": ["src/environments/*"]
//     },
//Este el corto
import { environment } from '@environments/environment';

@Component({
  selector: 'gifs-side-menu-header',
  templateUrl: './side-menu-header.component.html',
})
export class GifsSideMenuHeaderComponent {

  envs = environment;
}
