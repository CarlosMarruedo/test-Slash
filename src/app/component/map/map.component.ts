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
    zoom: 15
   };

   //las variables del marcador sobre el punto centro del mapa
   marker = new google.maps.Marker({
     position: this.coordinates,
     map: this.map,
   });
   

   infowindow = new google.maps.InfoWindow({
    content: "<p><b>Lat:</b> <a>" + this.lat+"</a> </p>" + 
    "<p><b>Lng:</b> " +this.lng + "</p>"
  })
  
   //llamar la inicializacion del mapa despues de que se haya cargado el componente
   ngAfterViewInit() {
     this.mapInitializer();
     //vincular infowindow con el marcador
     this.marker.addListener("click", () => {
      this.infowindow.open(this.map, this.marker);
    });
   }
   //funcion para inicializar el mapa y guardarlo en las variables del componente
   mapInitializer() {
     this.map = new google.maps.Map(this.gmap.nativeElement, 
     this.mapOptions);
     //poner el marcador en el mapa
     this.marker.setMap(this.map);
     this.moverToCurrentLoc();
   }
  //funcion para la geolocalizacion y mover la vista a esa posicion
   moverToCurrentLoc(){
    //preguntar o mirar si tienes permiso para la geolocalizacion
    if (navigator.geolocation) {
      //coger la posicion del usuario
      navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          //mover centro del mapa y marcador a la nueva posicion
          this.map.setCenter(new google.maps.LatLng(this.lat, this.lng));
          this.marker.setPosition(new google.maps.LatLng(this.lat, this.lng));
          //cambiar infowindow a la nueva posicion
          this.infowindow.setContent("<p><b>Lat:</b> <a>" + this.lat+"</a> </p>" + 
          "<p><b>Lng:</b> " +this.lng + "</p>" );
        });
        //negada peticion, dejarlo en la posicion por defecto
    }else {
      //console.log("User not allow")
      this.map.setCenter(new google.maps.LatLng(this.lat, this.lng));
    }
   }
}
