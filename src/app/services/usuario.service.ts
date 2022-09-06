import { Injectable } from '@angular/core';
import { IonGrid } from '@ionic/core/components';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //VARIABLES A UTILIZAR, admin
  usuarios: any[] = [
    {
      rut: '0.000.000-0',
      nom_completo: 'admin',
      fecha_nac: '1111-11-11',
      sede: 'Puente Alto',
      carrera: 'Ing. en informatica',
      correo: 'admin@duocuc.cl',
      password: 'admin',
      tipo_usuario: 'administrador'
    }
  ];
  userLogeado: string;
  constructor() { }
  //MÉTODOS DEL CRUD:
  agregarUsuario(usuario): boolean{
    if ( this.obtenerUsuario(usuario.correo) == undefined ) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }

  eliminarUsuarios(correo: string){
    this.usuarios.forEach((usu, index) => {
      if (usu.correo == correo) {
        this.usuarios.splice(index, 1);
      }
    })
  }

  actualizarUsuario(usuario){
    var index = this.usuarios.findIndex(usu => usu.correo == usuario.correo);
    this.usuarios[index] = usuario;
  }

  obtenerUsuario(correo: string){
    return this.usuarios.find(usu => usu.correo == correo);
  }

  obtenerUsuarios(){
    return this.usuarios;
  }

  //POSIBLE CUSTOMER
  validarLogin(correo, password){
    return this.usuarios.find(usu => usu.correo == correo && usu.password == password)
  }
}
