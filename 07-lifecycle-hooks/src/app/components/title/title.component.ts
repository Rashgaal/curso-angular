import { Component, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
})
export class TitleComponent implements OnChanges {

  title = input.required<string>();

  // para hacer los cambios de un input property, verificamos si no es el primer cambio
  // porque puede dar undefined
  ngOnChanges(changes: SimpleChanges) {

    console.log('ngOnChanges');
    for (const inputName in changes) {
      const inputValues = changes[inputName];
      console.log(`Previous ${inputName} == ${inputValues.previousValue}`);
      console.log(`Current ${inputName} == ${inputValues.currentValue}`);
      console.log(`Is first ${inputName} change == ${inputValues.firstChange}`);
    }
  }

}
