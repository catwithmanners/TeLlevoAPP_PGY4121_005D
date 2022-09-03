import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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

  constructor(private toastController: ToastController, private router: Router,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  //MÉTODOS
  login(){
    var usuarioLogin = this.usuarioService.validarLogin(this.user, this.password);

    if ( usuarioLogin != undefined ) {
      this.router.navigate(['/home'])
    } else {
      this.toastError();
    }
  }

  async toastError() {
    const toast = await this.toastController.create({
      message: 'Una de las credenciales es incorrecta. Intente nuevamente.',
      duration: 3000
    });
    toast.present();
  }
  
    volver() {
      this.modal.dismiss(null, 'volver');
    }
}
