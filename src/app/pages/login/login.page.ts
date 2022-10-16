import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit  {
  @ViewChild(IonModal) modal: IonModal;

  //VARIABLES A UTILIZAR
  user: string;
  password: string;
  recordar_login: boolean = false;

  constructor(private toastController: ToastController, private router: Router,
    private usuarioService: UsuarioService,private loadingCtrl: LoadingController) { }

  ngOnInit() {

  }

  //MÉTODOS
  login(){
    var usuarioLogin = this.usuarioService.validarLogin(this.user, this.password);
    if ( usuarioLogin != undefined ) {
      this.usuarioService.userLogeado = this.user;
      if(this.user == 'admin'){
        this.usuarioService.adminLog = true;
      }
      if (this.recordar_login != true){
        this.user='';
        this.password='';
        this.router.navigate(['/home']);
      }else{
        this.router.navigate(['/home'])
      }
    } else {
      this.toastError();
    }
  }
  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 500,
      cssClass: 'custom-loading',
      
    });

    loading.present();
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Una de las credenciales es incorrecta. Intente nuevamente.',
      duration: 3000,
      icon: 'alert-circle-outline',
      color: 'dark'
    });
    toast.present();
  }
  
    volver() {
      this.modal.dismiss(null, 'volver');
    }
}
