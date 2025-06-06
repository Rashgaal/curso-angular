import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heavy-loaders-slow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section [ngClass]="['w-full h-[600px]', cssClass]">
      Heavy Loader Slow

    </section>
  `,
})
export class HeavyLoadersSlowComponent {

  @Input({required:true}) cssClass!: string


  constructor() {
    // console.log('HeavyLoader Component');

    //No hacer en la vida real
    const start = Date.now();
    while (Date.now() - start < 3000) {}

    console.log('Cargado');


  }

}
