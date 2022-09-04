import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiculoPage } from './vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: VehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculoPageRoutingModule {}
