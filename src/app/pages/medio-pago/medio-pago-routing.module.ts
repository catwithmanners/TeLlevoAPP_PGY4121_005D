import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedioPagoPage } from './medio-pago.page';

const routes: Routes = [
  {
    path: '',
    component: MedioPagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedioPagoPageRoutingModule {}
