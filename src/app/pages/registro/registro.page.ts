import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController, IonModal } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { FireService } from 'src/app/services/fire.service';


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
  licencias: any[] = [
    {
      nombre: 'Ninguna',
    },
    {
      nombre: 'A1',
    },
    {
      nombre: 'A2',
    },
    {
      nombre: 'A3'
    }
  ]
  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nac: new FormControl('', [Validators.required]),
    sede: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    carrera: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    correo: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@duocuc+\\.cl$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    //tipo de usuario al registrar
    tipo_usuario: new FormControl('alumno', [Validators.required]),
    licencia: new FormControl('', [Validators.required]),
    img: new FormControl('default'),
  });
  //Variable para verificar la contraseña:
  verificar_pw: string;
  usuarios: any[] = [];
  KEY_USUARIOS = 'usuarios';
  mensaje: string;
  
  //variable de prueba
  v_registrar: boolean = false;


  verificar_checkbox: boolean = false;
  constructor(private router: Router,
              private alertController: AlertController, 
              private validaciones: ValidacionesService,
              private fireService: FireService) { }

  ngOnInit() {
    this.cargarDatos();
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
      message: '¡Usuario o correo ya registrados!',
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
  async presentAlert5() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡El rut es invalido!',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentAlert6() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡La edad mínima necesaria es 17 años!',
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentAlert7() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  cargarDatos(){
    //this.usuarios = await this.storage.getDatos(this.KEY_USUARIOS);
    this.fireService.getDatos('usuarios').subscribe(
      response => {
        this.usuarios = [];
        for (let usuario of response){
          this.usuarios.push(usuario.payload.doc.data());
        }
      }
    );
  }

  registrar(){
    //Validacion de ESPACIOS BLANCOS
    var respuesta2: boolean = this.validarEspacios();
    if (!respuesta2) {
      this.presentAlert7();
      return;
    }
    //Validación del RUT
    if (!this.validaciones.validarRut(this.usuario.controls.rut.value)) {
      this.presentAlert5();
      return;
    }
    //Validación de la EDAD
    if (!this.validaciones.validarEdadMinima(17,this.usuario.controls.fecha_nac.value)) {
      this.presentAlert6();
      return;
    }
    //Validación de la CONTRASEÑA
    if (this.usuario.controls.password.value != this.verificar_pw){
      this.presentAlert3();
      return;
    }
    //Validación de TERMINOS Y CONDICIONES
    if(this.verificar_checkbox != true){
      this.presentAlert4();
      return;
    }
    var respuesta: boolean = this.fireService.agregar(this.KEY_USUARIOS,this.usuario.value, this.usuario.controls.rut.value);
    if(respuesta){
      this.usuario.reset();
      this.verificar_pw = '';
      this.verificar_checkbox = false;
      this.presentAlert();
      this.cargarDatos();
      this.v_registrar = true; /* PRUEBA UNITARIA */
    }else{
      this.presentAlert2();
    }

  }

  validarEspacios(){
    var nombre1 = this.usuario.controls.nombre.value.trim();
    this.usuario.controls.nombre.setValue(nombre1);
    var apellidos1 = this.usuario.controls.apellidos.value.trim();
    this.usuario.controls.apellidos.setValue(apellidos1);
    var password1 = this.usuario.controls.password.value.trim();
    this.usuario.controls.password.setValue(password1);
    var respuesta: boolean = false;
    if (nombre1 == '') {
      this.mensaje = 'El nombre no tiene caracteres válidos';
      return respuesta;
    }
    if (nombre1.length < 3) {
      this.mensaje = 'El nombre es muy corto, los espacios no son caracteres validos';
      return respuesta; 
    }
    if (apellidos1 == '') {
      this.mensaje = 'El apellido no tiene caracteres válidos';
      return respuesta;
    }
    if (apellidos1.length < 3) {
      this.mensaje = 'El apellido es muy corto, los espacios no son caracteres validos';
      return respuesta;
    }
    if (password1 == '') {
      this.mensaje = 'La contraseña no tiene caracteres válidos';
      return respuesta;
    }
    if (password1.length < 6) {
      this.mensaje = 'La contraseña es muy corta, no puede tener espacios al inicio o al final';
      return respuesta;
    }
    if (password1.length > 18) {
      this.mensaje = 'La contraseña es muy larga';
      return respuesta;
    }
    respuesta = true;
    return respuesta;
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
