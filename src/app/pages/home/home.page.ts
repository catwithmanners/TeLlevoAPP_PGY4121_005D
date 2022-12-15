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
  viaje2: any;
  id_viaje: any;
  id_viaje2: any;
  KEY_VIAJES = 'viajes';
  KEY_USUARIOS = 'usuarios';
  KEY_VEHICULOS = 'vehiculos';

  v_usuario = false;
  constructor(private router: Router,
              private alertController: AlertController,
              private fireService: FireService,
              ) 
                {
                  this.user = this.router.getCurrentNavigation().extras.state.usuario;
                }

  ngOnInit() {
    this.cargarDatos();
    console.log('Lista de usuarios: ');
    console.log(this.usuarios);
    console.log('Lista de viajes: ');
    console.log(this.viajes);
    //console.log('Valor de viaje: '+JSON.stringify(this.viaje));
    //console.log('Valor de viaje2: '+JSON.stringify(this.viaje2));
    //this.cargarViaje();
    console.log('Rut usuario logeado: '+this.user.rut);
    //console.log(this.viajes);
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
          if (usuario.payload.doc.data()['rut']== this.user.rut) {
            this.user = usuario.payload.doc.data();
            //console.log('this.user actualizado: '+this.user);
          }
        }
      }
    )
    this.fireService.getDatos('viajes').subscribe(
      response => {
        //this.viajes = [];
        for (let viaje of response){
          //console.log(viaje.payload.doc.data())
          this.viajes.push(viaje.payload.doc.data());
          //console.log(this.viajes)
        }
      }
    )
    this.fireService.getDatos('viajes').subscribe(
      response => {
        //this.viaje = [];
        for (let viaje of response){
          //console.log(viaje.payload.doc.data()['rut']);
          if (viaje.payload.doc.data()['rut'] == this.user.rut) {
            //console.log('THIS IS IT');
            this.id_viaje = viaje.payload.doc.id
            this.viaje = viaje.payload.doc.data();
            //console.log(this.viaje);
          }
        }
      }
    )
    this.fireService.getDatos('viajes').subscribe(
      response => {
        this.viaje2 = [];
        for (let viaje of response){
          //for (const posicion in response) {
            //var pos = posicion;
            //console.log('pos: '+pos);
            //var number = 0;
            //console.log('viajeee: '+JSON.stringify(viaje.payload.doc.data()));
            //console.log(JSON.stringify(viaje.payload.doc.get('pasajeros')));
            //const viajeMap = JSON.parse(JSON.stringify(viaje.payload.doc.data()['pasajeros']));
            //const resp = viajeMap.map(x => x.rut);
            //console.log('resp: '+resp);
            //number += 1;
            //if (viaje.payload.doc.data()['pasajeros']['rut'] == this.user.rut) {
              //console.log(viaje.payload.doc.data()['estado']);
              if (viaje.payload.doc.data()['estado'] == true) {
                //console.log('THIS IS IT');
                if (viaje.payload.doc.data()['pasajeros'] != undefined) {
                  if (viaje.payload.doc.data()['pasajeros']['rut'] == undefined) {
                    for (let viaje5 of viaje.payload.doc.data()['pasajeros']){
                      if (viaje5.rut == this.user.rut) {
                        //console.log('this is the one: '+JSON.stringify(viaje.payload.doc.data()));
                        this.id_viaje2 = viaje.payload.doc.id
                        this.viaje2 = viaje.payload.doc.data();
                      }
                    }
                  }
                  if (viaje.payload.doc.data()['pasajeros']['rut']== this.user.rut) {
                    this.id_viaje2 = viaje.payload.doc.id
                    this.viaje2 = viaje.payload.doc.data();
                  }
                }
                //console.log(this.viaje2);
                
              }
            //}
          //}
        }
      }
    )

    //console.log('viaje222: '+JSON.stringify(this.viaje2));
    //this.viaje2 = this.viajes.find(dato => dato.estado == true && dato.pasajeros.rut == this.user.rut);
    //console.log('this.viaje2: '+JSON.stringify(this.viaje2));
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
  cargarUser(){
    if (this.router.getCurrentNavigation().extras.state.usuario3 != undefined) {
      this.user = this.router.getCurrentNavigation().extras.state.usuario3;
    }
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
    this.cargarDatos();
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
            id_viaje: this.id_viaje,
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
  async presentAlert2(msg) {
    const alert = await this.alertController.create({
      header: '¡Atención!',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
  goHistorial(){
    var navigationExtras6: NavigationExtras = {
      state: {
        usuario6: this.user
      }
    };
    this.router.navigate(['/historial'], navigationExtras6)
  }
  async goPasajero(){
    this.cargarDatos();
    //console.log(JSON.stringify(this.user));
    //this.cargarUser();
    if (this.user.carreraActiva) {
      var msg = '¡Lo sentimos! Estás realizando un viaje, no puedes tomar uno.';
      await this.presentAlert2(msg);
      return;
    }
    if (this.user.viajeActivo == true && this.viaje2 != undefined) {
      //this.cargarUser();
      if (this.viaje2.estado == false) {
        this.user.viajeActivo = false;
        this.fireService.actualizar('usuarios',this.user.rut, this.user);
        this.cargarDatos();
        var msg = '¡Lo sentimos! Tu viaje ya ha finalizado.'
        await this.presentAlert2(msg);
        return;
      }
      //var viajecito = this.viaje2.find(data => data.pasajeros.rut == this.user.rut);

      var navigationExtras6: NavigationExtras = {
        state: {
          usuario6: this.user,
          viaje: this.viaje2,
          id_viaje: this.id_viaje2,
        }
      };
      var msg = '¡Lo sentimos! Esta parte no está lista, pero pronto lo estará.';
      //await this.presentAlert2(msg);
      //console.log('this.viaje antes de ir a detalle: '+JSON.stringify(this.viaje2));
      this.router.navigate(['/detalle'], navigationExtras6);
      return;
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