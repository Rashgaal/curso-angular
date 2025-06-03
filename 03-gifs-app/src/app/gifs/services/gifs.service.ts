//Importaciones
//1º las de angular 2º las de terceros 3º las nuestras propias
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Gif } from '../interfaces/gif.interface';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';


const GIF_KEY = 'gifs';
const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';  //Guardamos un Record<string, gifs[]>
  const gifs = JSON.parse(gifsFromLocalStorage);

  return gifs;
}


// Trabaja como un singleton
@Injectable({ providedIn: 'root' })
export class GifService {

  //en vez de fecth se recomienda usar httpclient para hacer las peticiones
  private http = inject(HttpClient);
  //espacio para almacenar estado de los trending gifs
  trendingGifs = signal<Gif[]>([]);  //para recbirlos todos "clasico"

  trendingGifsLoading = signal(false);
  private trendingPage = signal(0);

  //grupos de 3 para el masonry
  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for(let i = 0; i< this.trendingGifs().length;i+=3){
      groups.push(this.trendingGifs().slice(i,i+3));
    }

    return groups;
  });



  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage())
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
  saveGifsToLocalStorage = effect(() => {
    //cada vez que cambie el searchHistory
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  });


  constructor() {
    this.loadTrendingGifs();
    console.log('Servicio creado')
  }

  //Cargar los trending
  loadTrendingGifs() {

    if(this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage()*20,
      },
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data)
      this.trendingGifs.update(currentGifs => [
        ...currentGifs,
        ...gifs
      ]);
      //para que no coja siempre los mismos aumentamos la pagina en 1(trendingPage)
      this.trendingPage.update(page => page+1)
      this.trendingGifsLoading.set(false);

    });
  }

  // Busqueda de gifs
  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query,
      },
    })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),


        // TODO: Historias
        // listado de items que han sido buscado
        tap(items => {
          this.searchHistory.update(history => ({
            ...history,
            [query.toLocaleLowerCase()]: items,
          }))
        })
      );


    // .subscribe((resp) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data)
    //   console.log({ search: gifs });
    // });
    // sin el subscribe no se dispara la peticion
  }


  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}

// tap operador para manejar efectos secundarios
