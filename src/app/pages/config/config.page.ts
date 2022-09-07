import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor(private pickerCtrl: PickerController, private alertController: AlertController) {}
  async presentAlert() {
    const alert = await this.alertController.create({
      message: '¡Medio de pago seleccionado!',
      buttons: ['Ok']
    });

    await alert.present();

  }
  ngOnInit() {
  }
  async openPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'medio',
          options: [
            {
              text: 'Efectivo',
              value: 'efectivo',
            },
            {
              text: 'Tarjeta de Débito',
              value: 'débito',
            },
            {
              text: 'Tarjeta de Crédito',
              value: 'crédito',
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.presentAlert();
          },
        },
      ],
    });

    await picker.present();
  }
}


