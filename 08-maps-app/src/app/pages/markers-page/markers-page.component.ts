import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
// instalar npm i uuid para generar identificadores unicos, v4 es el standar que queremos usar
import { v4 as UUIDv4 } from 'uuid';
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxKey;

//interface para controlar los marcadores
interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe
  ],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  //markers = signal<mapboxgl.Marker[]>([]) en vez de mapboxgl lo hacemos con nuestra interface de Marker
  markers = signal<Marker[]>([])

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-5.923894, 37.286593], // starting position [lng, lat]
      zoom: 14,
    });

    //para los marcadores, dentro pondremos las propiedades, a partir del punto seteamos donde va a estar y en el mapa que va a estar
    // const marker = new mapboxgl.Marker({
    //   draggable: false,
    //   color: '#000',
    // })
    //   .setLngLat([-5.923894, 37.286593])
    //   .addTo(map);

    // marker.on('dragend', (event) => {
    //   console.log(event);
    // });


    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {

    //listener de cuando alguien hace click
    map.on('click', (event) => this.mapClick(event));

    //referencia al mapa para crear los marcadores
    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {
    if (!this.map()) return;

    const map = this.map()!;
    const coords = event.lngLat;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const mapboxMarker = new mapboxgl.Marker({
      draggable: false,
      color: color,
    })
      .setLngLat(coords)
      .addTo(map);

    const newMarker: Marker = {
      id: UUIDv4(),
      mapboxMarker: mapboxMarker
    }

    //con set
    //this.markers.set([newMarker, ...this.markers()]);
    //con update
    this.markers.update((markers) => [newMarker, ...markers]);

    console.log(this.markers());
  }

  flyToMarker(lngLat: LngLatLike) {
    if (!this.map) return;

    this.map()?.flyTo({
      center:lngLat,
    })
  }

  deleteMarker(marker:Marker){
    if (!this.map) return;
    const map = this.map()!;

    marker.mapboxMarker.remove();

    //con set
    // this.markers.set(this.markers().filter(m => m.id !== marker.id));
    // con update
    this.markers.update((markers) => markers.filter(m => m.id !== marker.id));
  }
}
