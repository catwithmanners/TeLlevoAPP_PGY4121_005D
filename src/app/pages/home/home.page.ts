import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild(IonModal) modal: IonModal;

  //Variable para recibir datos desde el login
  user: any;
  viajes: any[] = [];
  vehiculos: any[] = [];
  usuarios: any[] = [];
  viaje: any;
  KEY_VIAJES = 'viajes';
  KEY_USUARIOS = 'usuarios';
  KEY_VEHICULOS = 'vehiculos';

  v_usuario = false;
  constructor(private router: Router,
              private alertController: AlertController,
              private fireService: FireService) 
                {
                  this.user = this.router.getCurrentNavigation().extras.state.usuario;
                }

  ngOnInit() {
    this.cargarDatos();
    console.log(this.usuarios);
    console.log(this.viajes);
    //this.cargarViaje();
    console.log(JSON.stringify(this.viaje));
    console.log(this.user.rut);
    console.log(this.viajes);
    //console.log(this.viajes.find(dato => dato.rut == this.user.rut));
    
  }

  cargarDatos(){
    this.fireService.getDatos('usuarios').subscribe(
      response => {
        //this.usuarios = [];
        for (let usuario of response){
          //console.log(usuario.payload.doc.data())
          this.usuarios.push(usuario.payload.doc.data())
          //console.log(this.usuarios)
        }
      }
    )
    this.fireService.getDatos('viajes').subscribe(
      response => {
        this.viajes = [];
        for (let viaje of response){
          //console.log(viaje.payload.doc.data())
          this.viajes.push(viaje.payload.doc.data())
          console.log(this.viajes)
        }
      }
    )
    this.fireService.getDatos('viajes').subscribe(
      response => {
        //this.viaje = [];
        for (let viaje of response){
          //console.log(viaje.payload.doc.data())
          if (viaje.payload.doc.data()['rut'] == this.user.rut) {
            console.log('THIS IS IT');
            this.viaje = viaje.payload.doc.data();
            console.log(this.viaje);
          }
          //this.viajes.push(viaje.payload.doc.data())
          //console.log(this.viajes)
        }
      }
    )
    this.fireService.getDatos('vehiculos').subscribe(
      response => {
        //this.vehiculos = [];
        for (let vehiculo of response){
          this.vehiculos.push(vehiculo.payload.doc.data())
          //console.log(this.vehiculos)
        }
      }
    )
    //this.viaje = [];
    
    //console.log('this.viajes: '+JSON.stringify(this.viajes));
    //console.log('this.viaje: '+JSON.stringify(this.viaje));
    //console.log('this.vehiculos: '+this.vehiculos);
    //console.log(this.usuarios);
  }

  cargarViaje(){
    this.viaje = [];
    this.viaje.push(this.viajes.find(dato => dato.rut == this.user.rut));
    console.log(JSON.stringify(this.viaje));
  }
  volver() {
    this.modal.dismiss(null, 'volver');
  }
  validarVehiculo(){
    //this.cargarDatos();
    var userVehiculo = this.vehiculos.find(dato => dato.rut == this.user.rut)
    //var respuesta: boolean = await this.storage.verificarVehiculo(this.KEY_USUARIOS,this.KEY_VEHICULOS,this.user.correo);
    if (userVehiculo != undefined) {
      //this.cargarDatos();
      if (this.user.carreraActiva) {
        //this.viaje = JSON.parse(JSON.stringify(this.viajes.find(dato => dato.correo == this.user.correo && dato.estado == true)));
        //this.viajes2 = this.viajes.find(dato => dato.correo == this.user.correo);
        console.log('Viaje dentro del metodo: '+this.viaje);
        //console.log('Viajes2: '+this.viajes2);
        var navigationExtras: NavigationExtras = {
          state: {
            usuario: this.user,
            viaje: this.viaje,
          }
        };
        this.router.navigate(['/carrera'], navigationExtras);
        return;
      }else{
        this.goToGeo();
      }
    }else{
      this.presentAlert();
    }
  }
  goPasajero(){
    if (this.user.viajeActivo) {
      var navigationExtras6: NavigationExtras = {
        state: {
          usuario6: this.user
        }
      };
      this.router.navigate(['/detalle'], navigationExtras6)
    }else{
    var navigationExtras6: NavigationExtras = {
      state: {
        usuario6: this.user
      }
    };
    this.router.navigate(['/viaje'], navigationExtras6)
    }
  }
  goApi(){
    var navigationExtras5: NavigationExtras = {
      state: {
        usuario5: this.user
      }
    };
    this.router.navigate(['/api'], navigationExtras5)
  }
  
  goToGeo(){
    var navigationExtras4: NavigationExtras = {
      state: {
        usuario4: this.user
      }
    };
    this.router.navigate(['/geo'], navigationExtras4)
  }
  
  irPerfil(){
    var navigationExtras3: NavigationExtras = {
      state: {
        usuario3: this.user,
        vehiculo: this.vehiculos,
      }
    };
    this.router.navigate(['/perfil'], navigationExtras3);
  }

  irAdmin(){
    var navigationExtras3: NavigationExtras = {
      state: {
        usuario3: this.user
      }
    };
    this.router.navigate(['/admin'], navigationExtras3);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: '¡No posees ningún vehiculo registrado!',
      buttons: [{
        text: 'Registrar vehiculo',
        handler: () => {
          var navigationExtras2: NavigationExtras = {
            state: {
              usuario2: this.user
            }
          };
          this.router.navigate(['/vehiculo'], navigationExtras2);
        } 
      },{
        text: 'Cancelar'
      }],

    });

    await alert.present();

  }
  logout(){
    this.fireService.logout();
  }

}