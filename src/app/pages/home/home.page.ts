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
  KEY_USUARIOS = 'usuarios';
  KEY_VEHICULOS = 'vehiculos';

  constructor(private router: Router,
              private storage: StorageService,
              private alertController: AlertController) { }

  ngOnInit() {
    this.user = this.router.getCurrentNavigation().extras.state.usuario;
  }
  volver() {
    this.modal.dismiss(null, 'volver');
  }
  async validarVehiculo(){
    var respuesta: boolean = await this.storage.verificarVehiculo(this.KEY_USUARIOS,this.KEY_VEHICULOS,this.user.correo);
    if (respuesta) {
      this.router.navigate(['/carrera'])
    }else{
      this.presentAlert();
    }
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