import { Component, OnInit } from '@angular/core';

import { v4 } from 'uuid';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  //VARIABLES PARA CREAR NUESTRO CÓDIGO QR:
  elementType = 'canvas';
  value = '';

  constructor() { }

  ngOnInit() {
    
  }

  generarQR(){
    if (this.value == '') {
      this.value = v4();
    }

  }
}
