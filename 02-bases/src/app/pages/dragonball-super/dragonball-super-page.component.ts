import { Component, inject } from "@angular/core";
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";
import { DragonballService } from '../../services/dragonball.service';

// interface Character {
//   id: number;
//   name: string;
//   power: number;
// }

@Component({
  templateUrl: './dragonball-super-page.component.html',
  selector: 'dragonball-super',
  imports: [CharacterListComponent, CharacterAddComponent],
})

export class DragonballSuperPageComponent {
  public dragonballService = inject(DragonballService);
}




// codigo comentado todo

// export class DragonballSuperPageComponent {

//   //Inyectamos el servicio

//   // constructor(
//   //   public DragonballService: DragonballService
//   // ) { }

//   //lo recomendado
//   public dragonballService = inject(DragonballService);

//   // addCharacter(){
//   //   this.DragonballService.addCharacter
//   // }

//   //tradicional
//   // characters = signal<Character[]>([
//   //   { id: 1, name: 'Goku', power: 9001 },
//   //   { id: 2, name: 'Vegeta', power: 8000 },
//   // ]);

//   // addCharacter(character:Character) {
//   //   this.characters.update( (list) => [...list, character])
//   // }

// }
