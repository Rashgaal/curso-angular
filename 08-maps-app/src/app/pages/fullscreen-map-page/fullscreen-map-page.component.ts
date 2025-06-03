import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { DecimalPipe, JsonPipe } from '@angular/common';
import { environment } from '../../../environments/environment.development';

mapboxgl.accessToken = environment.mapboxKey;


@Component({
  selector: 'app-fullscreen-map-page',
  imports: [
    DecimalPipe,
    JsonPipe
  ],
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
    div{
      width: 100vw;
      height: calc(100vh - 64px);
    }
    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `
})

export class FullscreenMapPageComponent implements AfterViewInit {
  //selector del elemento
  divElement = viewChild<ElementRef>('map');
  //cambiar el zoom del mapa, como no sabemos que tipo es copiamos la instancia de la clase, esto es una referencia al mapa
  map = signal<mapboxgl.Map | null>(null)
  //asignar el valor al zomm
  zoom = signal(14);
  // conocer las coordenadas centrales
  coordinates = signal({
    lng: -74.5,
    lat: 40,
  });

  zoomEffect = effect(() => {
    if (!this.map()) return;

    this.map()?.setZoom(this.zoom());   // con zoomTo hace una ligera animacion siendo más amigable
    // this.map()?.zoomTo(this.zoom());
  });

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;
    //por si no carga bien al iniciar, le damos este delay para darle tiempo
    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement
    const { lat, lng } = this.coordinates();

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });
    this.mapListeners(map);
  }
  // listeners del mapa, controles propios del mapa, en documentacion hay mas
  mapListeners(map: mapboxgl.Map) {
    // linkea el scroll del raton al zoom que mostramos
    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    })

    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });

    map.on('load', () => {
      console.log('Mapa cargado');
    });

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map);
  }
}
