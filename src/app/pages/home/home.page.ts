import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  @ViewChild(IonModal) modal: IonModal;
  user: string = this.usuarioService.userLogeado;
  constructor(private menu: MenuController, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }
    volver() {
      this.modal.dismiss(null, 'volver');
    }
  }