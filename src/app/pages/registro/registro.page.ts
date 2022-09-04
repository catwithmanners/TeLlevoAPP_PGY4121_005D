import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController, IonModal } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  sedes: any[] = [
    {
      nombre: 'Sede Alameda',
      value: 'Alameda'
    },
    {
      nombre: 'Sede Antonio Varas',
      value: 'Antonio Varas'
    },
    {
      nombre: 'Sede Educación Continua',
      value: 'Educacion Continua'
    },
    {
      nombre: 'Sede Maipú',
      value: 'Maipu'
    },
    {
      nombre: 'Sede Melipilla',
      value: 'Melipilla'
    },
    {
      nombre: 'Sede Puente Alto',
      value: 'Puente Alto'
    },
    {
      nombre: 'Sede Valparaíso',
      value: 'Valparaiso'
    },
  ];
  carreras: any[] = [
    {
      nombre: 'Ing en Informatica'
    },
    {
      nombre: 'Analista Programador Computacional'
    },
    {
      nombre: 'Administración de Redes y Telecomunicaciones'
    },
    {
      nombre: 'Ingeniería en Conectividad y Redes'
    },
    {
      nombre: 'Administración Hotelera'
    },
    {
      nombre: 'Animación Digital'
    },
    {
      nombre: 'Ilustracion'
    },
  ];
  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    fecha_nac: new FormControl('', [Validators.required]),
    sede: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    carrera: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    correo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@duocuc+\\.cl$')]),
    password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(9)]),
    tipo_usuario: new FormControl('alumno')
  });
  //Variable para verificar la contraseña:
  verificar_pw: string;
  usuarios: any[] = [];

  verificar_checkbox: boolean = false;
  constructor(private usuarioService: UsuarioService, private router: Router,private alertController: AlertController) { }

  ngOnInit() {
    this.usuarios = this.usuarioService.obtenerUsuarios();
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

  registrar(){
    if (this.usuario.controls.password.value != this.verificar_pw){
      this.presentAlert3();
      return;
    }else if(this.verificar_checkbox != true){
      this.presentAlert4();
      return;
    }
    var respuesta: boolean = this.usuarioService.agregarUsuario(this.usuario.value);
    if(respuesta){
      this.usuarioService.agregarUsuario(this.usuario.value);
      this.usuario.reset();
      this.verificar_pw = '';
      this.verificar_checkbox = false;
      this.presentAlert();
    }else{
      this.presentAlert2();
    }

  }
  volver() {
    this.modal.dismiss(null, 'volver');
  }
  volverLogin(){
    this.usuario.reset();
    this.verificar_pw = '';
    this.verificar_checkbox = false;
    this.router.navigate(['/login']);
  }

}
