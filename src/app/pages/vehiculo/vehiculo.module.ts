import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiculoPageRoutingModule } from './vehiculo-routing.module';

import { VehiculoPage } from './vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiculoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VehiculoPage]
})
export class VehiculoPageModule {}
