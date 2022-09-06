import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesarrolladoresPageRoutingModule } from './desarrolladores-routing.module';

import { DesarrolladoresPage } from './desarrolladores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesarrolladoresPageRoutingModule
  ],
  declarations: [DesarrolladoresPage]
})
export class DesarrolladoresPageModule {}
