import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private pickerCtrl: PickerController, private alertController: AlertController) {}
  async presentAlert() {
    const alert = await this.alertController.create({
      message: '¡Medio de pago seleccionado!',
      buttons: ['Ok']
    });

    await alert.present();

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
