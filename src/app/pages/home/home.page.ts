import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
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
  viajes2: any[] = [];
  viaje: any;
  KEY_VIAJES = 'viajes';
  KEY_USUARIOS = 'usuarios';
  KEY_VEHICULOS = 'vehiculos';

  constructor(private router: Router,
              private storage: StorageService,
              private alertController: AlertController) 
                {
                this.user = this.router.getCurrentNavigation().extras.state.usuario;
                }

  async ngOnInit() {
    await this.cargarDatos();
    console.log('Viaje.oninit: '+this.viaje.correo);
  }

  async cargarDatos(){
    this.viajes = await this.storage.getViajes(this.KEY_VIAJES);
    this.viaje = await this.storage.getViaje(this.KEY_VIAJES, this.user.correo);
  }
  volver() {
    this.modal.dismiss(null, 'volver');
  }
  async validarVehiculo(){
    var respuesta: boolean = await this.storage.verificarVehiculo(this.KEY_USUARIOS,this.KEY_VEHICULOS,this.user.correo);
    if (respuesta) {
      await this.cargarDatos();
      if (this.viaje != undefined) {
        //this.viaje = JSON.parse(JSON.stringify(this.viajes.find(dato => dato.correo == this.user.correo && dato.estado == true)));
        //this.viajes2 = this.viajes.find(dato => dato.correo == this.user.correo);
        console.log('Viaje: '+this.viaje);
        //console.log('Viajes2: '+this.viajes2);
        var navigationExtras: NavigationExtras = {
          state: {
            usuario: this.user,
          }
        };
        this.router.navigate(['/carrera'], navigationExtras);
        return;
      }
      this.goToGeo();
    }else{
      this.presentAlert();
    }
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
        usuario3: this.user
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
  async logout(){
    await this.storage.logout();
  }

}