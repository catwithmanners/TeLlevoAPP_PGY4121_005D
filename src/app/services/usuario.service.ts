import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //VARIABLES A UTILIZAR, admin
  usuarios: any[] = [
    {
      rut: '0.000.000-0',
      nombre: 'Admin',
      apellidos: 'Administrador',
      fecha_nac: '1111-11-11',
      sede: 'Puente Alto',
      carrera: 'Ing. en informatica',
      correo: 'admin@duocuc.cl',
      password: 'user',
      tipo_usuario: 'administrador'
    },{
      rut: '1.111.111-1',
      nombre: 'Alumno',
      apellidos: 'Alumnado',
      fecha_nac: '1111-11-11',
      sede: 'Puente Alto',
      carrera: 'Ing. en informatica',
      correo: 'alumno@duocuc.cl',
      password: 'user',
      tipo_usuario: 'alumno'
    }
  ];


  isAuthenticated = new BehaviorSubject(false);

  constructor(private router: Router) { }


  //MÉTODOS DEL CRUD:
  agregarUsuario(usuario): boolean{
    if ( this.obtenerUsuario(usuario.correo) == undefined ) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }

  eliminarUsuario(correo: string){
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
  logearUser(correo, password){
    var usuarioLogin = this.usuarios.find(usu => usu.correo == correo && usu.password == password);
    if (usuarioLogin != undefined) {
      this.isAuthenticated.next(true);
      return usuarioLogin;
    }
    //return this.usuarios.find(usu => usu.correo == correo && usu.password == password)
  }
  
  getAuth(){
    return this.isAuthenticated.value;
  }
  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  validarCorreo(correo){
    return this.usuarios.find(usu => usu.correo == correo);
  }
}
