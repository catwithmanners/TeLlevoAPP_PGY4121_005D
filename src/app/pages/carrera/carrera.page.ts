import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';


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
  ubicacionActual:  any;
  ubicacionInicio: any;
  //ubicacionInicio: any;
  ubicacionFin:  any;
  //ubicacionFin: any;
  KEY_VIAJES = 'viajes';
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
              private fireService: FireService) 
                {
                  this.user = this.router.getCurrentNavigation().extras.state.usuario;
                  this.viaje = this.router.getCurrentNavigation().extras.state.viaje;
                }


  async ngOnInit() {

    await this.dibujarMapa();
    //console.log(this.viaje.origen);
    console.log(this.user);
    console.log(this.ubicacionInicio);
    console.log(this.ubicacionFin);
    await this.calcularRuta();

    //this.viaje = this.viajes.find(dato => dato.rut == this.user.rut && dato.estado == true);
    console.log('Valor this.viaje: '+this.viaje);
    if (this.viaje != undefined) {
    
    }


    //this.viaje = await this.storage.getViaje(this.KEY_VIAJES, this.user.correo);
    await this.fireService.getDatos('viajes').subscribe(
      response => {
        this.viajes = [];
        for (let usuario of response){
          let user = usuario.payload.doc.data();
          this.viajes.push(user);
        }
      }
    );
  
    this.viaje = [];
    await this.viaje.push(this.viajes.push(dato => dato.rut == this.user.rut)).subscribe;
    console.log(this.viaje);
    this.ubicacionInicio.lat = this.viaje[0].origen.lat;
    this.ubicacionInicio.lng = this.viaje[0].origen.lng;
    this.ubicacionFin.lat = this.viaje[0].destino.lat;
    this.ubicacionFin.lng = this.viaje[0].destino.lng;
    console.log(this.ubicacionInicio);
    console.log(this.ubicacionFin);
    //console.log('This.user.rut: '+this.user.rut);
    //console.log('This.viajes.rut: '+this.viajes);
    //this.viaje = this.viajes.find(dato => dato.rut == this.user.rut && dato.estado == true);


  };


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
