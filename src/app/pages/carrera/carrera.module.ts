import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarreraPageRoutingModule } from './carrera-routing.module';

import { CarreraPage } from './carrera.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarreraPageRoutingModule
  ],
  declarations: [CarreraPage]
})
export class CarreraPageModule {}
