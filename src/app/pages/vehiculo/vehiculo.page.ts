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
  user: any;
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
    await this.cargarDatosUsuarios();
    await this.cargarDatosVehiculos();

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
  async cargarDatosUsuarios(){
    this.usuarios = await this.storage.getDatos(this.KEY_USUARIOS);
  }
  async cargarDatosVehiculos(){
    this.vehiculos = await this.storage.getDatos(this.KEY_VEHICULOS);
  }

  async registrarVeh(){
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
  volver() {
    this.modal.dismiss(null, 'volver');
  }
  volverAtras(){
    this.vehiculo.reset();
    this.router.navigate(['/home']);
  }
}
