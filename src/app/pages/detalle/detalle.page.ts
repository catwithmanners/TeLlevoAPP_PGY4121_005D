import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';

declare var google;

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  user: any;
  viaje: any;
  vehiculo: any;
  ubicacionActual:  any;
  ubicacionInicio = { lat: 0, lng: 0};
  ubicacionFin = { lat: 0, lng: 0};
  viajes: any[] = [];

  //Variables mapa
  mapa: any;
  marker: any;
  search: any;
  search2: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  direccion1: string;
  direccion2: string;

  constructor(private router: Router, 
              private fireService: FireService) {
                this.user = this.router.getCurrentNavigation().extras.state.usuario6;
                this.viaje = this.router.getCurrentNavigation().extras.state.viaje;
                }

  async ngOnInit() {
    console.log(this.viaje);
    this.ubicacionInicio.lat = this.viaje.origen.lat;
    this.ubicacionInicio.lng = this.viaje.origen.lng;
    this.ubicacionFin.lat = this.viaje.destino.lat;
    this.ubicacionFin.lng = this.viaje.destino.lng;
    await this.dibujarMapa();
    await this.calcularRuta();

    await this.fireService.getDatos('viajes').subscribe(
      response => {
        this.viajes = [];
        for (let usuario of response){
          let user = usuario.payload.doc.data();
          this.viajes.push(user);
        }
      }
    );
  }
  async cargarDatos(){
    await this.fireService.getDatos('viajes').subscribe(
      response => {
        this.viajes = [];
        for (let usuario of response){
          let user = usuario.payload.doc.data();
          this.viajes.push(user);
        }
      }
    );
  }

  async dibujarMapa(){
    var map: HTMLElement = document.getElementById('map');
    await this.cargarDatos();
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
  async calcularRuta(){
    console.log('Viaje.origen: '+this.viaje.origen);
    console.log('Viaje.destino: '+this.viaje.destino);
    var request = {
      origin: this.ubicacionInicio ,
      destination: this.ubicacionFin,
      travelMode: google.maps.TravelMode.DRIVING /* se traza el viaje */
    };

    await this.directionsService.route(request, (respuesta, status)=> {
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
