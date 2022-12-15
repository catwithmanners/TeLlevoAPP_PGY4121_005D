import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal, ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  
  //Variable para verificar la contraseña:
  verificar_pw: string;
  //VARIABLES PARA CREAR NUESTRO CÓDIGO QR:
  elementType = 'canvas';
  value = '';


  user: any;
  usuario: any[] = [];
  vehiculos: any[] = [];
  vehiculo: any;
  KEY_USUARIOS = 'usuarios';
  KEY_VEHICULOS = 'vehiculos';
  codigo_qr: any;


  verificar_checkbox: boolean = false;
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;

  constructor(private router: Router,
              private alertController: AlertController,
              private toastController: ToastController,
              private fireService: FireService,
              private storage: AngularFireStorage) { 
                this.user = this.router.getCurrentNavigation().extras.state.usuario3;
                this.vehiculos = this.router.getCurrentNavigation().extras.state.vehiculo;
              }

  ngOnInit() {
    console.log('Valor this.vehiculos: '+this.vehiculos);
    this.cargarDatos();
    this.fotoPerfil();
  }

  upload(event) {
    // Obtener el archivo a través del input
    const file = event.target.files[0];
    console.log(file)

    // Generar un ID aleatorio
    const randomId = Math.random().toString(36).substring(2);
    console.log(randomId);
    const filepath = `perfil/${randomId}`;

    const fileRef = this.storage.ref(filepath);
    console.log(filepath)

    // Subir imagen
    const task = this.storage.upload(filepath, file);
    console.log(task)
    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();

    // Get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.uploadURL = fileRef.getDownloadURL())
    ).subscribe();
  }

  fotoPerfil() {
    const fileRef = this.storage.ref('perfil');
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
  cargarDatos(){
    //this.usuario = await this.storage.getCorreo(this.KEY_USUARIOS, this.user.correo);
    //this.vehiculo = await this.storage.getCorreo(this.KEY_VEHICULOS, this.user.correo) || [];
    /*this.fireService.getDatos('vehiculos').subscribe(
      response => {
        this.vehiculos = [];
        for (let vehiculo of response){
          this.vehiculos.push(vehiculo.payload.doc.data());
        }
      }
    );*/
    this.vehiculo = this.vehiculos.find(dato => dato.rut == this.user.rut);
    console.log('Valor this.vehiculos cargardatos: '+this.vehiculos);
    if (this.vehiculo != undefined) {
      console.log('Valor this.vehiculo.patente: '+this.vehiculo.patente);
    }
  }
  cambiarPassword(){
    
  }
  generarQR(){
    if (this.value == '') {
      this.value = this.user.correo;
      this.qrGenerado();
    }
  }

  async qrGenerado() {
    const toast = await this.toastController.create({
      message: '¡Se ha generado código QR!',
      duration: 500,
      icon: 'happy-outline',
      color: 'dark'
    });
    toast.present();
  }
  
  volver() {
    this.modal.dismiss(null, 'volver');
  }


}
