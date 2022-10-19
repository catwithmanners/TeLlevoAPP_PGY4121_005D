import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras,Router } from '@angular/router';
import { AlertController,IonModal } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  colores: any[] = [
    {
      nombre: 'Azul',
    },
    {
      nombre: 'Rojo',
    },
    {
      nombre: 'Negro',
    },
    {
      nombre: 'Amarillo'
    },
    {
      nombre: 'Verde'
    },
    {
      nombre: 'Gris'
    }
  ]

  tipo_vehiculo: any[] = [
    {
      nombre: 'Auto',
    },
    {
      nombre: 'Camioneta',
    },
    {
      nombre: 'Furgoneta',
    }
  ]
  vehiculo = new FormGroup({
    patente: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    tipo_vehiculo: new FormControl('',[Validators.required]),
    cap_pasajeros: new FormControl('',[Validators.required, Validators.min(1), Validators.max(6)]),
    color: new FormControl('',[Validators.required]),
    marca: new FormControl('', [Validators.required,Validators.minLength(4)]),
    modelo: new FormControl('', [Validators.required, Validators.minLength(4)]),
    correo: new FormControl('default', [Validators.required])
  });
  usuarios: any[] = [];
  vehiculos: any[] = [];
  //Variable para verificar que el usuario posee una licencia de conducir, falta cargar los datos
  usuario: any[] = [];
  user: any;
  mensaje: string;
  KEY_USUARIOS = 'usuarios';
  KEY_VEHICULOS = 'vehiculos';
  verificar_checkbox: boolean = false;
  constructor(private usuarioService: UsuarioService, 
              private router: Router, 
              private vehiculoService: VehiculoService,
              private alertController: AlertController,
              private storage: StorageService,) { 
                this.user = this.router.getCurrentNavigation().extras.state.usuario2;
              }

  async ngOnInit() {
    await this.cargarDatos();
    console.log(this.user);
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡Vehiculo registrado!',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/home']);
        } 
      }],
    });

    await alert.present();

  }
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡Vehiculo ya registrado!',
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
  async presentAlert3() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: this.mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async cargarDatos(){
    this.usuarios = await this.storage.getDatos(this.KEY_USUARIOS);
    this.vehiculos = await this.storage.getDatos(this.KEY_VEHICULOS);
  }

  async registrarVeh(){
    var respuesta2: boolean = this.validarEspacios();
    if (!respuesta2) {
      this.presentAlert3();
      return;
    }
    if(this.verificar_checkbox != true){
      this.presentAlert4();
      return;
    }
    this.vehiculo.controls.correo.setValue(this.user.correo);
    var respuesta: boolean = await this.storage.agregar(this.KEY_VEHICULOS,this.vehiculo.value);
    if(respuesta){
      this.vehiculo.reset();
      this.verificar_checkbox = false;
      this.presentAlert();
    }else{
      this.presentAlert2();
    }
  }
  validarEspacios(){
    var patente1 = this.vehiculo.controls.patente.value.trim();
    this.vehiculo.controls.patente.setValue(patente1);
    var marca1 = this.vehiculo.controls.marca.value.trim();
    this.vehiculo.controls.marca.setValue(marca1);
    var modelo1 = this.vehiculo.controls.modelo.value.trim();
    this.vehiculo.controls.modelo.setValue(modelo1);
    var respuesta: boolean = false;
    if (patente1 == '') {
      this.mensaje = 'La patente no tiene caracteres válidos';
      return respuesta;
    }
    if (patente1.length != 6) {
      this.mensaje = 'La patente debe contener 6 caracteres, no puede tener espacios al inicio o al final.';
      return respuesta; 
    }
    if (marca1 == '') {
      this.mensaje = 'La marca no tiene caracteres válidos';
      return respuesta;
    }
    if (marca1.length < 4) {
      this.mensaje = 'La marca es muy corta, no puede tener espacios al inicio o al final.';
      return respuesta;
    }
    if (modelo1 == '') {
      this.mensaje = 'El modelo no tiene caracteres válidos';
      return respuesta;
    }
    if (modelo1.length < 4) {
      this.mensaje = 'El modelo es muy corta, no puede tener espacios al inicio o al final.';
      return respuesta;
    }
    respuesta = true;
    return respuesta;
  }
  volver() {
    this.modal.dismiss(null, 'volver');
  }
  volverAtras(){
    this.vehiculo.reset();
    this.router.navigate(['/home']);
  }
}
