import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  //variable
  correo: string = '';
  
  constructor(private storage: StorageService, private router: Router) { }

  ngOnInit() {
  }

  async recuperar(){
    if (await this.storage.validarCorreo(this.correo) != undefined) {
      alert('Se ha enviado una confirmación al correo.');
      this.correo = '';
      this.router.navigate(['/login']);
    }else{
      alert('El correo ingresado no existe.');
    }
  }
  
}
