import { UpperCasePipe } from "@angular/common";
import { Component, computed, signal } from "@angular/core";

@Component({
  templateUrl: './hero-page.component.html',
  imports: [UpperCasePipe],
})

export class HeroPageComponent {

  name = signal('Ironman');
  age = signal(45);

  heroDescription = computed(() => {
    return `${this.name()}  -  ${this.age()}`;
  })
  // computed solo lectura
  capitalizedName = computed(() => this.name().toUpperCase());

  changeHero() {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  resetForm() {
    this.name.set('Ironman');
    this.age.set(45);
  }

  changeAge() {
    this.age.set(60);
  }

}


// 1º crear el componente (ts y html)
// 2º indicar la ruta en app.routes.ts
// 3º Modificar el html e introducir los componentes {{Doble lalve y () para llamar}}
// ctrl + . AYUDA MUCHO
