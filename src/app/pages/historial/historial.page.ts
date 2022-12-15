import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  viajes: any[] = [];
  viaje: any;
  viajesValidos: any[] = [];
  pasajeros: any[]=[];
  historial: any[]=[];
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
    this.fireService.getDatos('viajes').subscribe(
      response => {
        this.historial = [];
        for (let viaje of response){
          if (viaje.payload.doc.data()['pasajeros'] != undefined) {
            if (viaje.payload.doc.data()['pasajeros']['rut'] == undefined) {
              for (let viaje5 of viaje.payload.doc.data()['pasajeros']){
                if (viaje5.rut == this.user.rut) {
                  //console.log('this is the one: '+JSON.stringify(viaje.payload.doc.data()));
                  //this.id_viaje2 = viaje.payload.doc.id
                  this.historial.push(viaje.payload.doc.data());
                }
              }
            }
            if (viaje.payload.doc.data()['pasajeros']['rut']== this.user.rut) {
              this.historial.push(viaje.payload.doc.data());
            }
          }
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

}
