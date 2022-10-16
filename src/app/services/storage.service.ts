import { Injectable } from '@angular/core';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  //Variables:
  datos: any [] = [];


  constructor(private storage: Storage) { 
    storage.create()
  }

  //Métodos CRUD:

  async agregar(key, dato){
    this.datos = await this.storage.get(key) || [];
    //VERIFICAR SI EL DATO ENTRANTE TIENE ID
    //Si tiene id, buscamos si existe, si no existe, se debe crear uno
    if (dato.id == ''){
      var id = this.datos.length + 1 || 1;
      dato.id = id;
      this.datos.push(dato);
      await this.storage.set(key, this.datos);
      return true;
    }
    return false;
  }

  async getDato(key, identificador){
    this.datos = await this.storage.get(key) || [];
    return this.datos.find(dato => dato.id == identificador);
  }

  async getDatos(key){
    this.datos = await this.storage.get(key) || [];
    return this.datos;
  }

  async eliminar(key, identificador){
    this.datos = await this.storage.get(key) || [];
    this.datos.forEach((value, index) => {
      if(value.id == identificador ){
        this.datos.splice(index, 1);
      }
    });
    await this.storage.set(key, this.datos);
    
  }

  async actualizar(key, dato){
    this.datos = await this.storage.get(key) || [];
    var index = this.datos.findIndex(value => value.id == dato.id);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);
  }
}
