import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //VARIABLES A UTILIZAR, admin
  usuarios: any[] = [
    {
      rut: '6',
      nom_completo: 'Ghotless',
      fecha_nac: '1998-06-09',
      semestre: 3,
      password: '1',
      tipo_usuario: 'administrador'
    }
  ];

  constructor() { }
  //MÉTODOS DEL CRUD:
  agregarUsuario(usuario): boolean{
    if ( this.obtenerUsuario(usuario.rut) == undefined ) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }

  eliminarUsuarios(rut: string){
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    })
  }

  actualizarUsuario(usuario){
    var index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }

  obtenerUsuario(rut: string){
    return this.usuarios.find(usu => usu.rut == rut);
  }

  obtenerUsuarios(){
    return this.usuarios;
  }

  //POSIBLE CUSTOMER
  validarLogin(rut, password){
    return this.usuarios.find(usu => usu.rut == rut && usu.password == password)
  }
}
