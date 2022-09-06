import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesarrolladoresPage } from './desarrolladores.page';

const routes: Routes = [
  {
    path: '',
    component: DesarrolladoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesarrolladoresPageRoutingModule {}
