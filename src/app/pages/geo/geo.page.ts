import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/* 1- VARIABLE GOOGLE PARA USAR LA API */
declare var google;

@Component({
  selector: 'app-geo',
  templateUrl: './geo.page.html',
  styleUrls: ['./geo.page.scss'],
})
export class GeoPage implements OnInit {

  viajar = new FormGroup({
    origen: new FormControl(''),
    autocomplete: new FormControl(''),
    valViaje: new FormControl(''),
  });
  //2. VAMOS A CREAR LAS VARIABLES NECESARIAS PARA EL MAPA:
  mapa: any;
  marker: any;
  search: any;
  search2: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();


  ubicacionDuoc = { lat: 0, lng: 0 };
  ubicacionDestino = { lat: 0, lng: 0 };
  ubicacionMcDonald = { lat: -33.600379048832046, lng: -70.57719180496413 };

  constructor() { }

  async ngOnInit() {
    var geo = await this.getUbicacionActual();
    this.ubicacionDuoc.lat = geo.coords.latitude;
    this.ubicacionDuoc.lng = geo.coords.longitude;

    this.dibujarMapa();
    //this.agregarMarcador();
    this.ubiInicial(this.mapa, this.marker);
    this.ubiDestino(this.mapa, this.marker);
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
    this.marker.setPosition(this.ubicacionMcDonald);
    this.marker.setMap(this.mapa);
  }

  //método para que el input me muestre sugerencias de busqueda de dirección:
  /* Dirección 1 - place */
  async ubiInicial(mapaLocal, marcadorLocal){
    var autocomplete: HTMLElement = document.getElementById('origen');
    const search = new google.maps.places.Autocomplete(autocomplete);
    this.search = search;

    search.addListener('place_changed', function(){
      var place = search.getPlace().geometry.location; /* El formato de "location" es un JSON */

      console.log(place)
      console.log('Origen: ' + typeof place);

      var origen = JSON.stringify(place); /* Obtengo la dirección y la transformo de formato */
      var ubicacion = JSON.parse(origen) /* Se vuelve a transformar */


      mapaLocal.setCenter(place);
      mapaLocal.setZoom(15);
      marcadorLocal.setPosition(place);
      this.ubicacionDuoc = ubicacion;
      console.log(this.ubicacionDuoc)
    });
  }

  /* Dirección 2 - places */
  async ubiDestino(mapaLocal, marcadorLocal){
    var autocomplete: HTMLElement = document.getElementById('autocomplete');
    const search = new google.maps.places.Autocomplete(autocomplete);
    this.search2 = search;

    search.addListener('place_changed', function(){
      var places = search.getPlace().geometry.location; /* El formato de "location" es un JSON */

      console.log(places)
      console.log('Direc. destino: ' + typeof places);

      var formato = JSON.stringify(places); /* Obtengo la dirección y la transformo de formato */
      
      console.log("Formato tipo: ", formato);

      this.ubicacionDestino = formato;
      console.log("Destino: ", this.ubicacionDestino);

      mapaLocal.setCenter(places);
      mapaLocal.setZoom(15);

      marcadorLocal.setPosition(places);
    });
  }

  //MÉTODO PARA ENCONTRAR LA RUTA ENTRE 2 DIRECCIONES:
  calcularRuta(){
    var place = this.search.getPlace().geometry.location; /* dirección 1 */
    var places = this.search.getPlace().geometry.location; /* dirección 2 */
    var request = {
      origen: place,
      destination: places,
      travelMode: google.maps.TravelMode.DRIVING /* se traza el viaje */
    };

    this.directionsService.route(request, (respuesta, status)=> {
      this.directionsRenderer.setDirections(respuesta);
    });

    this.marker.setPosition(null);

    this.ubicacionDuoc = JSON.parse(JSON.stringify(place))
    /* this.ubicacionDestino= JSON.parse(JSON.stringify(places)) */
  }

  //mi ubicacion actual:
  async getUbicacionActual(): Promise<any>{
    return await new Promise(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
  }

}
