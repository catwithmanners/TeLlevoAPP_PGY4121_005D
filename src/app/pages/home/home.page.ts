import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild(IonModal) modal: IonModal;

  //Variable para recibir datos desde el login
  user: any;
  viajes: any[] = [];
  vehiculos: any[] = [];
  viaje: any;
  KEY_VIAJES = 'viajes';
  KEY_USUARIOS = 'usuarios';
  KEY_VEHICULOS = 'vehiculos';

  constructor(private router: Router,
              private storage: StorageService,
              private alertController: AlertController,
              private fireService: FireService) 
                {
                this.user = this.router.getCurrentNavigation().extras.state.usuario;
                }

  ngOnInit() {
    this.cargarDatos();
    if (this.viajes != undefined) {
      console.log('Viajes.oninit: '+this.viajes.length);
    }
  }

  cargarDatos(){
    //this.viajes = await this.storage.getViajes(this.KEY_VIAJES);
    //this.viaje = await this.storage.getViaje(this.KEY_VIAJES, this.user.correo);
    this.fireService.getDatos('viajes').subscribe(
      response => {
        this.viajes = [];
        for (let usuario of response){
          this.viajes.push(usuario.payload.doc.data());
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
    this.viaje = this.viajes.find(dato => dato.rut == this.user.rut && dato.estado == true)
    if (this.viaje != undefined) {
      console.log('Valor this.viaje.destino: '+this.viaje.destino.lat);
    }
  }
  volver() {
    this.modal.dismiss(null, 'volver');
  }
  validarVehiculo(){
    //this.cargarDatos();
    var userVehiculo = this.vehiculos.find(dato => dato.rut == this.user.rut)
    //var respuesta: boolean = await this.storage.verificarVehiculo(this.KEY_USUARIOS,this.KEY_VEHICULOS,this.user.correo);
    if (userVehiculo != undefined) {
      this.cargarDatos();
      if (this.viaje != undefined) {
        //this.viaje = JSON.parse(JSON.stringify(this.viajes.find(dato => dato.correo == this.user.correo && dato.estado == true)));
        //this.viajes2 = this.viajes.find(dato => dato.correo == this.user.correo);
        console.log('Viaje: '+this.viaje);
        //console.log('Viajes2: '+this.viajes2);
        var navigationExtras: NavigationExtras = {
          state: {
            usuario: this.user,
            viaje: this.viaje,
          }
        };
        this.router.navigate(['/carrera'], navigationExtras);
        return;
      }else{
        this.goToGeo();
      }
    }else{
      this.presentAlert();
    }
  }
  goPasajero(){
    var navigationExtras6: NavigationExtras = {
      state: {
        usuario6: this.user
      }
    };
    this.router.navigate(['/viaje'], navigationExtras6)
  }
  goApi(){
    var navigationExtras5: NavigationExtras = {
      state: {
        usuario5: this.user
      }
    };
    this.router.navigate(['/api'], navigationExtras5)
  }
  
  goToGeo(){
    var navigationExtras4: NavigationExtras = {
      state: {
        usuario4: this.user
      }
    };
    this.router.navigate(['/geo'], navigationExtras4)
  }
  
  irPerfil(){
    var navigationExtras3: NavigationExtras = {
      state: {
        usuario3: this.user,
        vehiculo: this.vehiculos,
      }
    };
    this.router.navigate(['/perfil'], navigationExtras3);
  }

  irAdmin(){
    var navigationExtras3: NavigationExtras = {
      state: {
        usuario3: this.user
      }
    };
    this.router.navigate(['/admin'], navigationExtras3);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡No posees ningún vehiculo registrado!',
      buttons: [{
        text: 'Registrar vehiculo',
        handler: () => {
          var navigationExtras2: NavigationExtras = {
            state: {
              usuario2: this.user
            }
          };
          this.router.navigate(['/vehiculo'], navigationExtras2);
        } 
      },{
        text: 'Cancelar'
      }],

    });

    await alert.present();

  }
  logout(){
    this.fireService.logout();
  }

}