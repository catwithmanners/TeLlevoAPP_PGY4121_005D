import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController,IonModal } from '@ionic/angular';
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
    }
  ]
  licencias: any[] = [
    {
      nombre: 'A1',
    },
    {
      nombre: 'A2',
    },
    {
      nombre: 'A3',
    },
    {
      nombre: 'A4'
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
    },
    {
      nombre: 'Bicicleta'
    }
  ]
  vehiculo = new FormGroup({
    patente: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    tipo_vehiculo: new FormControl('',[Validators.required]),
    tipo_licencia: new FormControl('',[Validators.required]),
    cap_pasajeros: new FormControl('',[Validators.required, Validators.min(1), Validators.max(6)]),
    color: new FormControl('',[Validators.required]),
    marca: new FormControl('', [Validators.required,Validators.minLength(4)]),
    modelo: new FormControl('', [Validators.required, Validators.minLength(4)]),
    correo: new FormControl('')
  });
  usuarios: any[] = [];
  vehiculos: any[] = [];
  user: any;
  verificar_checkbox: boolean = false;
  constructor(private usuarioService: UsuarioService, 
              private router: Router, 
              private vehiculoService: VehiculoService,
              private alertController: AlertController) { }

  ngOnInit() {
    this.usuarios = this.usuarioService.obtenerUsuarios();
    this.vehiculos = this.vehiculoService.obtenerVehiculos();
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

  registrarVeh(){
    if(this.verificar_checkbox != true){
      this.presentAlert4();
      return;
    }
    var respuesta: boolean = this.vehiculoService.agregarVehiculo(this.vehiculo.value);
    if(respuesta){
      this.vehiculo.controls.correo.setValue(this.user);
      this.vehiculoService.agregarVehiculo(this.vehiculo.value);
      this.vehiculo.reset();
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
