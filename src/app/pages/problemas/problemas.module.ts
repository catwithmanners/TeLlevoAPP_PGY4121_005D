import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProblemasPageRoutingModule } from './problemas-routing.module';

import { ProblemasPage } from './problemas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProblemasPageRoutingModule
  ],
  declarations: [ProblemasPage]
})
export class ProblemasPageModule {}
