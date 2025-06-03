import { CommonModule } from '@angular/common';
import { Component, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  selector: 'app-change-detection',
  imports: [CommonModule, TitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <!-- <app-title title="Change Detection" /> -->
  <app-title [title]="currentFramework()" />
  <pre> {{ frameworkAsSignal() | json }} </pre>
  <pre> {{ frameworkAsProperty | json }} </pre>
  `,
  styles: ``,
})
export default class ChangeDetectionComponent {

  public currentFramework = computed(
    () => `Change detection - ${this.frameworkAsSignal().name}`
  );

  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: '2016',
  });


  public frameworkAsProperty = {
    name: 'Angular',
    releaseDate: '2016',
  };

  constructor() {

    setTimeout(() => {

      // this.frameworkAsProperty.name = 'React';

      //primera manera para las señales
      // this.frameworkAsSignal.update(value => ({
      //   ...value,
      //   name: 'React',
      // }))
      //segunda manera para las señales
      this.frameworkAsSignal.update(value => {
        value.name = 'React'
        return{...value};
      })

      console.log('Hecho');
    }, 3000);
  }
}
