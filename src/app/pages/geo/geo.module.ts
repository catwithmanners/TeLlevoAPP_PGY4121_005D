import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeoPageRoutingModule } from './geo-routing.module';

import { GeoPage } from './geo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GeoPage]
})
export class GeoPageModule {}
