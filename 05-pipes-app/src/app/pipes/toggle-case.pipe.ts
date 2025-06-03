import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase'
})

// PipeTransform => nos permite ejecutar el metodo cada vez que se ejecute o cambie nuestra data
export class ToggleCasePipe implements PipeTransform {

  transform(value: string, upper: boolean = true): string {

    return upper ? value.toUpperCase() : value.toLowerCase();
  }

}
