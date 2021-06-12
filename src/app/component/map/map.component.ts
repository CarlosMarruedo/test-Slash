import { Component, OnInit,  AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  //la variable que guarda el mapa
  map!: google.maps.Map;
  //la latitud en el centro del mapa
  lat = 40.73061;
  //la longitud en el centro del mapa
  lng = -73.935242;
  //generar la variable LatLng para paserle un punto centro en el mapa
  coordinates = new google.maps.LatLng(this.lat, this.lng);

  //dar al mapa acceso al DOM
  @ViewChild('mapContainer', { static: false })  gmap!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  //inicializar las variables del objeto mapa
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
   };

   //las variables del marcador sobre el punto centro del mapa
   marker = new google.maps.Marker({
     position: this.coordinates,
     map: this.map,
   });

   //llamar la inicializacion del mapa despues de que se haya cargado el componente
   ngAfterViewInit() {
     this.mapInitializer();
   }
   //funcion para inicializar el mapa y guardarlo en las variables del componente
   mapInitializer() {
     this.map = new google.maps.Map(this.gmap.nativeElement, 
     this.mapOptions);
     //poner el marcador en el mapa
     this.marker.setMap(this.map);
   }

}
