import { Component, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  templateUrl: './character-add.component.html',
})

export class CharacterAddComponent {
  name = signal('');
  power = signal(0);
  characters: any;

  newCharacter = output<Character>();

  addCharacter() {
    if (!this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      //id: this.characters().length + 1,
      id: Math.floor(Math.random() * 1000),
      name: this.name(),
      power: this.power(),
    }



    // this.characters().push(newCharacter);
    // se recomienda esta de abajo
    // this.characters.update((list) => [...list, newCharacter]);
    // console.log(newCharacter)
    this.newCharacter.emit(newCharacter);
    this.resetFields();
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
