import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  //variable
  correo: string = '';
  
  constructor(private fireService: FireService, private router: Router,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  async recuperar(){
    if (await this.fireService.validarCorreo(this.correo) != undefined) {
      this.validMail();
      this.correo = '';
      this.router.navigate(['/login']);
    }else{
      this.invalidMail();
    }
  }

  async invalidMail() {
    const toast = await this.toastController.create({
      message: 'El correo ingresado no existe.',
      duration: 3000,
      icon: 'sad-outline',
      color: 'dark'
    });
    toast.present();
  }
  async validMail() {
    const toast = await this.toastController.create({
      message: '¡Correo de recuperación enviado!',
      duration: 4000,
      icon: 'happy-outline',
      color: 'dark'
    });
    toast.present();
  }
  
}
