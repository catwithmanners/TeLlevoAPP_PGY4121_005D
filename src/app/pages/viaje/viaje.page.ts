import { Component, OnInit } from '@angular/core';

import { NavigationExtras,Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';

import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {


  viajes: any[] = [];
  viaje: any;
  viajesValidos: any[] = [];
  pasajeros: any[]=[];
  pasajero =[];
  usuarios: any[] = [];
  vehiculos: any[] = [];
  vehiculo: any;
  user: any;

  constructor(private fireService: FireService,
              private alertController: AlertController,
              private router: Router) { }

  ngOnInit() {
    this.user = this.router.getCurrentNavigation().extras.state.usuario6
    console.log('Nombre de usuario: '+this.user.nombre);
    this.cargarDatos();
    console.log(this.viajes);
  }

  cargarDatos(){
    this.fireService.getDatos('viajes').subscribe(
      response => {
        this.viajes = [];
        for (let usuario of response){
          this.viajes.push({id: usuario.payload.doc.id,data: usuario.payload.doc.data()});
        }
      }
    );
    this.fireService.getDatos('usuarios').subscribe(
      response => {
        this.usuarios = [];
        for (let usuario of response){
          this.usuarios.push(usuario.payload.doc.data());
        }
      }
    );
    this.fireService.getDatos('vehiculos').subscribe(
      response => {
        this.vehiculos = [];
        for (let usuario of response){
          this.vehiculos.push(usuario.payload.doc.data());
        }
      }
    );
    //this.viajesValidos = this.viajes.find(dato => dato.estado == true);
    console.log('Valor this.viajes cargardatos: '+this.viajes);
    console.log('Valor this.viajesValidos cargardatos: '+this.viajesValidos);
  }
  buscarViaje(){
    this.viajesValidos = this.viajes.find(dato => dato.estado == true);
  }

  regPasajero(id, rut2){
    this.viaje = [];
    this.vehiculo = [];
    this.vehiculo.push(this.vehiculos.find(dato => dato.rut == rut2));
    this.viaje.push(this.viajes.find(dato => dato.data.rut == rut2 && dato.data.estado == true ));
    console.log('viaje: '+ JSON.stringify(this.viaje));
    console.log('Vehiculo: '+ JSON.stringify(this.vehiculo));
    //this.viaje.data.pasajeros = [];
    //console.log(JSON.stringify(this.viaje[0].data));
    if (this.viaje[0].data.pasajeros.rut == '') {
      this.viaje[0].data.pasajeros['rut'] = this.user.rut;
      this.viaje[0].data.pasajeros['nombre'] = this.user.nombre;
      this.viaje[0].data.pasajeros['correo'] = this.user.correo;
      //this.viaje[0].data.pasajeros.set({rut: , nombre: , correo: })
      console.log('Viaje2: '+JSON.stringify(this.viaje));
      this.user.viajeActivo = true;
      this.fireService.actualizar('usuarios',this.user.rut,this.user)
      var viajeOld = this.viaje[0].data;
      this.viaje = viajeOld;
      console.log(JSON.stringify(this.viaje));
      //this.viaje.push(viajeOld);
      this.fireService.regPasajero('viajes',id,this.viaje)
      this.router.navigate(['/home']);
      return;
    }
    var viajesOld = [];
    var vo = JSON.parse(JSON.stringify(this.viaje[0].data.pasajeros));
    console.log('vo: '+vo);
    viajesOld.push(vo);
    console.log('viajesOld: '+JSON.stringify(viajesOld));
    
    //this.viaje[0].data.pasajeros = [];
    //this.viaje[0].data.pasajeros.push(viajesOld);
    //console.log('pasajeros: '+JSON.stringify(this.viaje[0].data.pasajeros));
    viajesOld.push({
      rut: this.user.rut, 
      nombre: this.user.nombre, 
      correo: this.user.correo});
    console.log('viajesOld2: '+JSON.stringify(viajesOld));
    this.viaje[0].data.pasajeros = viajesOld;
    console.log('pasajeros2: '+JSON.stringify(this.viaje[0].data.pasajeros));
    //return;
    //var datos: any[] = [{rut: this.user.rut, nombre: this.user.name, correo: this.user.correo}];
    //this.fireService.meterArray('viajes',id, datos);
    //var viajesOld2 = this.viaje[0].data.pasajeros;
    //this.viaje[0].data.pasajeros = viajesOld2;
    var viajeOld = this.viaje[0].data;
    this.viaje = viajeOld;
    console.log('Viaje2: '+JSON.stringify(this.viaje));
    //this.viaje.push(viajeOld);
    
    this.user.viajeActivo = true;
    this.fireService.regPasajero('viajes',id,this.viaje)
    this.fireService.actualizar('usuarios',this.user.rut,this.user)
    this.router.navigate(['/home']);
    //this.viaje[0].data.pasajeros = [];
      
    /*this.pasajero.push({
      destino: {lat: this.viaje.data.destino.lat, lng: this.viaje.data.destino.lng},
      origen: {lat: this.viaje.data.origen.lat, lng: this.viaje.data.origen.lng},
      estado: this.viaje.data.estado,
      rut: rut2,
      valViaje: this.viaje.data.valViaje,
      pasajeros: {
        rut: this.user.rut, 
        nombre: this.user.nombre, 
        correo: this.user.correo
      }
    });*/ 
    //console.log('Pasajero: '+JSON.stringify(this.pasajero));
    
    //this.fireService.regPasajero('viajes',id,this.pasajero)
    //this.pasajero = [];
  }
}
