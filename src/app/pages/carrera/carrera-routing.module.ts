import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarreraPage } from './carrera.page';

const routes: Routes = [
  {
    path: '',
    component: CarreraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarreraPageRoutingModule {}
