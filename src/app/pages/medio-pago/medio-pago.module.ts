import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedioPagoPageRoutingModule } from './medio-pago-routing.module';

import { MedioPagoPage } from './medio-pago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedioPagoPageRoutingModule
  ],
  declarations: [MedioPagoPage]
})
export class MedioPagoPageModule {}
