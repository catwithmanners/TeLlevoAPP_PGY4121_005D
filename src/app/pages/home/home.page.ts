import { Component, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal: IonModal;

  constructor(private menu: MenuController) { }
  


    volver() {
      this.modal.dismiss(null, 'volver');
    }
  }