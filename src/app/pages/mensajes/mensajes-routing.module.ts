import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensajesPage } from './mensajes.page';

const routes: Routes = [
  {
    path: '',
    component: MensajesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensajesPageRoutingModule {}
