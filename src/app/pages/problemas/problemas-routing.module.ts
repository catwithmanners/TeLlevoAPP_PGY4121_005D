import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProblemasPage } from './problemas.page';

const routes: Routes = [
  {
    path: '',
    component: ProblemasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProblemasPageRoutingModule {}
