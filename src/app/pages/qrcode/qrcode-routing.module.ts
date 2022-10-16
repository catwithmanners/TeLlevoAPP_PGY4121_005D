import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrcodePage } from './qrcode.page';

const routes: Routes = [
  {
    path: '',
    component: QrcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrcodePageRoutingModule {}
