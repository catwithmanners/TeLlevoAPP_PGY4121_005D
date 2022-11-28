import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras,Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { StorageService } from 'src/app/services/storage.service';

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
    destino: new FormControl(''),
    valViaje: new FormControl('', [Validators.required, Validators.min(1000)]),
    rut: new FormControl(''),
    estado: new FormControl(false),
    pasajeros: new FormGroup({
      rut: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl('')
    })
  });
  //2. VAMOS A CREAR LAS VARIABLES NECESARIAS PARA EL MAPA:
  mapa: any;
  marker: any;
  search: any;
  search2: any;
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  KEY_VIAJES = 'viajes';
  user: any;

  usuario: any;
  vehiculo: any;

  ubicacionInicial: any;
  ubicacionDuoc =  { lat: 0, lng: 0};
  ubicacionDestino: any;
  ubicacionMcDonald = { lat: -33.600379048832046, lng: -70.57719180496413 };

  verificar_checkbox: boolean = false;
  constructor(private router: Router, 
              private storage: StorageService,
              private alertController: AlertController,
              private fireService: FireService) { 
    this.user = this.router.getCurrentNavigation().extras.state.usuario4;
  }

  async ngOnInit() {
    console.log(this.ubicacionDuoc); // Esto muestra los valores por defecto (lat: 0 y lng: 0)
    var geo = await this.getUbicacionActual();
    this.ubicacionDuoc.lat = geo.coords.latitude;
    this.ubicacionDuoc.lng = geo.coords.longitude;
    console.log(this.ubicacionDuoc); // Esto muestra los valores cambiados por la ubicaciòn actual
    this.dibujarMapa();
    //this.agregarMarcador();
    //await this.ubiInicial(this.mapa, this.marker);
    await this.ubiDestino(this.mapa, this.marker);
    console.log(this.ubicacionDuoc); // Esto muestra los valores cambiados por el método ubiInicial
    
    console.log(this.user);
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
  cambiarInicial(){
    if (this.verificar_checkbox) {
      this.viajar.controls.origen.disable();
    }
    if (!this.verificar_checkbox) {
      this.viajar.controls.origen.enable();
    }
  }

  //método para que el input me muestre sugerencias de busqueda de dirección:
  /* Dirección 1 - place */
  async ubiInicial(mapaLocal, marcadorLocal){
    var autocomplete: HTMLElement = document.getElementById('origen');
    const search = new google.maps.places.Autocomplete(autocomplete);
    this.search = search;
    

    search.addListener('place_changed', function(){
      var place = search.getPlace().geometry.location; /* El formato de "location" es un JSON */

      console.log(place);
      console.log('Origen: ' + typeof place);

      var origen = JSON.stringify(place); /* Obtengo la dirección y la transformo de formato */
      var ubicacion = JSON.parse(origen); /* Se vuelve a transformar */


      mapaLocal.setCenter(place);
      mapaLocal.setZoom(15);
      marcadorLocal.setPosition(place);
      this.ubicacionInicial = ubicacion;
      console.log('Ubi Inicial: '+this.ubicacionInicial);
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
      var formato2 = JSON.parse(formato);
      this.ubicacionDestino = formato2;
      console.log("Destino: ", this.ubicacionDestino);

      mapaLocal.setCenter(places);
      mapaLocal.setZoom(15);

      marcadorLocal.setPosition(places);
    });
  }

  //MÉTODO PARA ENCONTRAR LA RUTA ENTRE 2 DIRECCIONES:
  calcularRuta(){
    var place = this.ubicacionDuoc;//this.search.getPlace().geometry.location; /* dirección 1 */
    /*if (this.verificar_checkbox) {
      place = this.search.getPlace().geometry.location;
    }*/
    console.log(place);
    var places = this.search2.getPlace().geometry.location; /* dirección 2 */
    var request = {
      origin: place,
      destination: places,
      travelMode: google.maps.TravelMode.DRIVING /* se traza el viaje */
    };

    this.directionsService.route(request, (respuesta, status)=> {
      this.directionsRenderer.setDirections(respuesta);
    });

    this.marker.setPosition(null);

  }
  async crearViaje(){
    var places = this.search2.getPlace().geometry.location;
    this.ubicacionInicial = this.ubicacionDuoc;
    this.viajar.controls.origen.setValue(this.ubicacionInicial);
    this.ubicacionDestino = JSON.parse(JSON.stringify(places));
    this.viajar.controls.destino.setValue(this.ubicacionDestino);
    this.viajar.controls.estado.setValue(true);
    console.log(this.ubicacionDestino);
    //this.viajar.controls.destino.disable();
    //this.viajar.controls.valViaje.disable();

    this.viajar.controls.rut.setValue(this.user.rut);

    //this.verificar_checkbox = true;
    var respuesta: boolean = await this.fireService.agregar(this.KEY_VIAJES,this.viajar.value, this.viajar.controls.rut.value);
    if (respuesta) {
      this.viajar.reset()
      this.presentAlert();
      return;
    }
    this.presentAlert2();
  }

  cancelarViaje(){
    this.viajar.reset()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡El viaje ha sido creado correctamente!',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.router.navigate(['/home']);
        } 
      }],

    });

    await alert.present();

  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: '¡Error!',
      message: '¡El viaje no se ha podido crear!',
      buttons: [{
        text: 'Ok'
      }],

    });

    await alert.present();

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
