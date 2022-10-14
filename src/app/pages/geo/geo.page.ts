import { Component, OnInit } from '@angular/core';

/* 1- VARIABLE GOOGLE PARA USAR LA API */
declare var google;

@Component({
  selector: 'app-geo',
  templateUrl: './geo.page.html',
  styleUrls: ['./geo.page.scss'],
})
export class GeoPage implements OnInit {

  //2. VAMOS A CREAR LAS VARIABLES NECESARIAS PARA EL MAPA:
  mapa: any;
  marker: any;
  search: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();


  ubicacionDuoc = { lat: 0, lng: 0 };
  ubicacionMcDonald = { lat: -33.600379048832046, lng: -70.57719180496413 };

  constructor() { }

  async ngOnInit() {
    var geo = await this.getUbicacionActual();
    this.ubicacionDuoc.lat = geo.coords.latitude;
    this.ubicacionDuoc.lng = geo.coords.longitude;

    this.dibujarMapa();
    //this.agregarMarcador();
    this.buscarDireccion(this.mapa, this.marker);
  }

  //3. VAMOS A CREAR LOS MÉTODOS NECESARIOS PARA EL MAPA:
  //método que dibuja el mapa en el div map:
  dibujarMapa(){
    var map: HTMLElement = document.getElementById('map');

    this.mapa = new google.maps.Map(map, {
      center: this.ubicacionDuoc,
      zoom: 18
    });

    this.directionsRenderer.setMap(this.mapa);
    var indicaciones: HTMLElement = document.getElementById('indicaciones');
    this.directionsRenderer.setPanel(indicaciones);

    this.marker = new google.maps.Marker({
      position: this.ubicacionDuoc,
      map: this.mapa
    });

  }

  //agregar un nuevo marcador al mapa:
  agregarMarcador(){
    /* new google.maps.Marker({
      position: this.ubicacionMcDonald,
      map: this.mapa
    }); */
    this.marker.setPosition(this.ubicacionMcDonald);
    this.marker.setMap(this.mapa);
  }

  //método para que el input me muestre sugerencias de busqueda de dirección:
  buscarDireccion(mapaLocal, marcadorLocal){
    var autocomplete: HTMLElement = document.getElementById('autocomplete');
    const search = new google.maps.places.Autocomplete(autocomplete);
    this.search = search;

    search.addListener('place_changed', function(){
      var place = search.getPlace().geometry.location;
      
      mapaLocal.setCenter(place);
      mapaLocal.setZoom(15);

      marcadorLocal.setPosition(place);
    });
  }

  //MÉTODO PARA ENCONTRAR LA RUTA ENTRE 2 DIRECCIONES:
  calcularRuta(){
    var place = this.search.getPlace().geometry.location;

    var request = {
      origin: this.ubicacionDuoc,
      destination: place,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (respuesta, status)=> {
      this.directionsRenderer.setDirections(respuesta);
    });

    this.marker.setPosition(null);
  }

  //mi ubicacion actual:
  getUbicacionActual(): Promise<any>{
    return new Promise(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
  }

}
