import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  //Variables:
  isAuthenticated= new BehaviorSubject(false);
  datos: any [] = [];
  admin: any [] = [
    {
      rut: '00.000.000-0',
      nombre: 'admin',
      correo: 'admin@duocuc.cl',
      password: 'admin1',
      tipo_usuario: 'administrador',
    }];


  constructor(private storage: Storage,
              private router: Router) { 
    storage.create()
  }

  //Métodos CRUD:

  async agregar(key, dato){
    this.datos = await this.storage.get(key) || [];
    if (key == 'usuarios') {
      var rut = await this.getUsuario(key, dato.rut);
      var correo = await this.getCorreo(key, dato.correo);
      if (rut == undefined && correo == undefined) {
        this.datos.push(dato);
        await this.storage.set(key, this.datos);
        return true;
      }
    }
    if (key == 'vehiculos') {
      var patente = await this.getVehiculo(key, dato.patente);
      var correo = await this.getCorreo(key, dato.correo);
      if (patente == undefined) {
        this.datos.push(dato);
        await this.storage.set(key, this.datos);
        return true;
      }
    }
    if (key == 'viajes') {
      var correo = await this.getCorreo(key, dato.correo);
      if (correo == undefined) {
        this.datos.push(dato);
        await this.storage.set(key, this.datos);
        return true;
      }
    }
    return false;
  }
  //Métodos para obtener datos
  async getDato(key, identificador){
    this.datos = await this.storage.get(key) || [];
    return this.datos.find(dato => dato.id == identificador);
  }
  async getUsuario(key, rut){
    this.datos = await this.storage.get(key) || [];
    return this.datos.find(dato => dato.rut == rut);
  }
  async getCorreo(key, correo){
    this.datos = await this.storage.get(key) || [];
    return this.datos.find(dato => dato.correo == correo);
  }
  async getVehiculo(key, patente){
    this.datos = await this.storage.get(key) || [];
    return this.datos.find(dato => dato.patente == patente);
  }
  async getDatos(key){
    this.datos = await this.storage.get(key) || [];
    return this.datos;
  }
  //Método para eliminar
  async eliminar(key, identificador){
    this.datos = await this.storage.get(key) || [];
    this.datos.forEach((value, index) => {
      if(value.id == identificador ){
        this.datos.splice(index, 1);
      }
    });
    await this.storage.set(key, this.datos);
    
  }
  //Método para actualizar
  async actualizar(key, dato){
    this.datos = await this.storage.get(key) || [];
    var index = this.datos.findIndex(value => value.id == dato.id);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);
  }
  async cambiarPassword(key, correo, img){
    this.datos = await this.storage.get(key) || [];

  }
  //Método para logear
  async logearUser(key, correo, password){
    this.datos = await this.storage.get(key) || [];
    if (correo == 'admin@duocuc.cl') {
      var userLogin = this.admin.find(usu => usu.correo == correo && usu.password == password);
      if (userLogin != undefined) {
        this.isAuthenticated.next(true);
        return userLogin;
      }
    }else{
    var userLogin = this.datos.find(usu => usu.correo == correo && usu.password == password);
    if (userLogin != undefined) {
      this.isAuthenticated.next(true);
      return userLogin;
    }
    //return this.usuarios.find(usu => usu.correo == correo && usu.password == password)
  }}
  getAuth(){
    return this.isAuthenticated.value;
  }
  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }
  async verificarVehiculo(key1, key2, correo){
    var datosUsuarios = await this.storage.get(key1);
    var datosVehiculos = await this.storage.get(key2);
    if (datosUsuarios != undefined && datosVehiculos != undefined) {
      var dato1 = datosUsuarios.find(usu => usu.correo == correo);
      var dato2 = datosVehiculos.find(veh => veh.correo == correo);
      if (dato1.correo == dato2.correo) {
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  /* RECUPERAR */
  async validarCorreo(correo){
    this.datos = await this.storage.get('usuarios') || [];
    return this.datos.find(usu => usu.correo == correo);
  }
}
