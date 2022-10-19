import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IonModal } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit  {
  @ViewChild(IonModal) modal: IonModal;

  //VARIABLES A UTILIZAR
  user = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)])
  });
  KEY_USUARIOS = 'usuarios';
  recordar_login: boolean = false;
  usuarios: any[] = [];

  constructor(private toastController: ToastController, 
    private router: Router,
    private usuarioService: UsuarioService, 
    private loadingCtrl: LoadingController,
    private storage: StorageService) { }

  async ngOnInit() {
    await this.cargarDatos();
  }

  //MÉTODOS

  async cargarDatos(){
    this.usuarios = await this.storage.getDatos(this.KEY_USUARIOS);
  }

  async login(){
    //rescatamos las variables del formulario por separado:
    var correoValid = this.user.controls.correo.value;
    var passValid = this.user.controls.password.value;

    //rescatamos el usuario con el método login usuario:
    var usuarioLogin = await this.storage.logearUser(this.KEY_USUARIOS,correoValid, passValid);
    //validamos si existe el usuario
    if (usuarioLogin != undefined) {
      //AQUI, ANTES DE REDIRECCIONAR HACIA OTRA PÁGINA, PREPARAREMOS LOS DATOS QUE QUEREMOS ENVIAR:
      var navigationExtras: NavigationExtras = {
        state: {
          usuario: usuarioLogin
        }
      };
      if (this.recordar_login != true) {
        this.router.navigate(['/home'], navigationExtras);
        this.user.reset();
      }
      //redirigimos dependiente del tipo de usuario
      this.router.navigate(['/home'], navigationExtras);
    } else {
      await this.toastError();
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
