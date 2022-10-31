import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

declare var google;

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.page.html',
  styleUrls: ['./carrera.page.scss'],
})
export class CarreraPage implements OnInit {

  user: any;
  viaje: any;
  vehiculo: any;
  ubicacionActual =  { lat: 0, lng: 0};
  ubicacionInicio =  { lat: 0, lng: 0};
  ubicacionFin =  { lat: 0, lng: 0};
  KEY_VIAJES = 'viajes';

  //Variables mapa
  mapa: any;
  marker: any;
  search: any;
  search2: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();


  constructor(private storage: StorageService,
              private router: Router,
              private alertController: AlertController) 
                {
                  this.user = this.router.getCurrentNavigation().extras.state.usuario;
                }


  async ngOnInit() {
    //var geo = await this.getUbicacionActual();
    //this.ubicacionActual.lat = geo.coords.latitude;
    //this.ubicacionActual.lng = geo.coords.longitude;
    await this.cargarDatos();
    this.dibujarMapa();
    console.log(this.viaje.origen);
    console.log(this.user);
    console.log(this.ubicacionInicio);
    console.log(this.ubicacionFin);
    this.calcularRuta();
  }
  async cargarDatos(){
    this.viaje = await this.storage.getViaje(this.KEY_VIAJES, this.user.correo);
    this.ubicacionInicio.lat = this.viaje.origen.lat;
    this.ubicacionInicio.lng = this.viaje.origen.lng;
    this.ubicacionFin.lat = this.viaje.destino.lat;
    this.ubicacionFin.lng = this.viaje.destino.lng;
  };

  dibujarMapa(){
    var map: HTMLElement = document.getElementById('map');

    this.mapa = new google.maps.Map(map, {
      center: this.ubicacionInicio,
      zoom: 18
    });

    this.directionsRenderer.setMap(this.mapa);
    var indicaciones: HTMLElement = document.getElementById('indicaciones');
    this.directionsRenderer.setPanel(indicaciones);

    this.marker = new google.maps.Marker({
      position: this.ubicacionInicio,
      map: this.mapa
    });

  }

  calcularRuta(){
    console.log('Viaje.origen: '+this.ubicacionInicio);
    console.log('Viaje.destino: '+this.ubicacionFin);
    var request = {
      origin: this.ubicacionInicio,
      destination: this.ubicacionFin,
      travelMode: google.maps.TravelMode.DRIVING /* se traza el viaje */
    };

    this.directionsService.route(request, (respuesta, status)=> {
      this.directionsRenderer.setDirections(respuesta);
    });

    this.marker.setPosition(null);

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
