import { Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';


const client1 = {
  name: 'Quino',
  gender: 'male',
  age: 34,
  address: 'Dos Hermanas, Sevilla'
}
const client2 = {
  name: 'Carmen',
  gender: 'female',
  age: 32,
  address: 'Málaga, Málaga'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [
    CardComponent,
    I18nSelectPipe,
    I18nPluralPipe,
    SlicePipe,
    JsonPipe,
    UpperCasePipe,
    KeyValuePipe,
    TitleCasePipe,
    AsyncPipe
  ],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {
  // i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  }

  changeClient() {
    if (this.client() === client1) {
      this.client.set(client2);
      return;
    }

    this.client.set(client1);
  }


  // i18n Plural

  clientsMap = signal({
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'tenemos un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando',
  })

  clients = signal([
    'Maria',
    'Pedro',
    'Fernando',
    'Natalia',
    'Quino',
    'Carlos',
    'Melissa',
    'Carmen',
  ]);

  deleteClient() {
    this.clients.update(prev => prev.slice(1));
  }

  //keyValue Pipe
  profile = {
    name: 'Quino',
    age: 34,
    address: 'Dos Hermanas, Sevilla',
  }

  // Async Pipe

  promiseValue: Promise<string> = new Promise((resolve, reject) => {

    setTimeout(() => {
      // reject('Tenemos un error en la data');
      resolve('Tenemos data en la promesa.');
      console.log('Promesa finalizada');
    }, 3500);

  });

  // Async con observable
  //si no hay nada suscrito al observable no pasara nada
  myObservableTimer = interval(2000).pipe(
    map((value) => value + 1),
    tap((value) => console.log('tap: ', value))

  );

}
