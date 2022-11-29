import { Component, OnInit } from '@angular/core';
import { NavigationExtras,Router } from '@angular/router';
import { AlertController, IonModal } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

    //Variable para recibir datos desde el login
    user: any;
    viajes: any[] = [];
    vehiculos: any[] = [];
    viaje: any;
    KEY_VIAJES = 'viajes';

  constructor(private router: Router,
    private alertController: AlertController,
    private fireService: FireService) 
      {
      this.user = this.router.getCurrentNavigation().extras.state.usuario;
      }

  ngOnInit() {
    this.cargarDatos();
  }
  cargarDatos(){
    this.fireService.getDatos('viajes').subscribe(
      response => {
        this.viajes = [];
        for (let usuario of response){
          this.viajes.push(usuario.payload.doc.data());
        }
      }
    );
    this.fireService.getDatos('vehiculos').subscribe(
      response => {
        this.vehiculos = [];
        for (let usuario of response){
          this.vehiculos.push(usuario.payload.doc.data());
        }
      }
    );
    this.viaje = this.viajes.find(dato => dato.rut == this.user.rut && dato.estado == true)
    if (this.viaje != undefined) {
      console.log('Valor this.viaje.destino: '+this.viaje.destino.lat);
    }
  }

}
