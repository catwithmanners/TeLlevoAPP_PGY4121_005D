import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController, IonModal, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  
  //Variable para verificar la contraseña:
  verificar_pw: string;
  //VARIABLES PARA CREAR NUESTRO CÓDIGO QR:
  elementType = 'canvas';
  value = '';


  user: any;
  usuario: any[] = [];
  vehiculo: any[] = [];
  KEY_USUARIOS = 'usuarios';
  KEY_VEHICULOS = 'vehiculos';
  codigo_qr: any;

  verificar_checkbox: boolean = false;
  constructor(private storage: StorageService,
              private router: Router,
              private alertController: AlertController,
              private toastController: ToastController) { 
                this.user = this.router.getCurrentNavigation().extras.state.usuario3;
              }

  async ngOnInit() {
    await this.cargarDatos();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡Usuario registrado!',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/login']);
        } 
      }],
    });

    await alert.present();

  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡Usuario ya registrado!',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentAlert3() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡Las contraseñas no coinciden!',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentAlert4() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡Debes aceptar los términos y condiciones!',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async cargarDatos(){
    this.usuario = await this.storage.getCorreo(this.KEY_USUARIOS, this.user.correo);
    this.vehiculo = await this.storage.getCorreo(this.KEY_VEHICULOS, this.user.correo) || [];
  }
  cambiarPassword(){
    
  }
  generarQR(){
    if (this.value == '') {
      this.value = this.user.correo;
      this.qrGenerado();
    }
  }

  async qrGenerado() {
    const toast = await this.toastController.create({
      message: '¡Se ha generado código QR!',
      duration: 500,
      icon: 'happy-outline',
      color: 'dark'
    });
    toast.present();
  }
  
  volver() {
    this.modal.dismiss(null, 'volver');
  }


}
