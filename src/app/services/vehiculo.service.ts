import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  vehiculos: any[]=[{
    patente: '000000',
    tipo_vehiculo: 'nube',
    tipo_licencia: 'GOD1',
    cap_pasajeros: '1',
    color: 'blanco',
    marca: 'heaven',
    modelo: 'nube',
    correo: 'admin@duocuc.cl'
  }];
  constructor() { }
  //Métodos CRUD:
  agregarVehiculo(vehiculo): boolean{
    if(this.obtenerVehiculo(vehiculo.patente) == undefined){
      this.vehiculos.push(vehiculo);
      return true
    }
    return false;
  }

  eliminarVehiculo(patente: string){
    this.vehiculos.forEach((veh, index) =>{
      if(veh.patente = patente){
        this.vehiculos.splice(index, 1);
      }
    })
  }

  actualizarVehiculo(vehiculo){
    var index = this.vehiculos.findIndex(veh => veh.patente == vehiculo.patente);
    this.vehiculos[index] = vehiculo;
  }

  obtenerVehiculo(patente: string){
    return this.vehiculos.find(veh => veh.patente == patente);
  }

  obtenerVehiculos(){
    return this.vehiculos;
  }
}
