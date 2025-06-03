import { Injectable, signal } from '@angular/core';


//Servicio para guardar los state del scroll
@Injectable({providedIn: 'root'})
export class ScrollStateService {
  trendingScrollState = signal(0);

  // scrollScrollState: Record<string, number> = {
  //   'page1': 1000,
  //   'page2': 0,
  //   'aboutPage': 50,
  // }


}
