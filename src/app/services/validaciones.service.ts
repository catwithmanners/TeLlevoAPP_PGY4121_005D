import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

    //Métodos para validar:
  //Validar RUT
  validarRut(rut): boolean {
    var rutSimple = rut.replace('.', '').replace('.', '').replace('-', '');
    rutSimple = rutSimple.substring(0, rutSimple.length - 1);
    var rutArreglo: any[] = rutSimple.split('').reverse();

    var acumulador: number = 0;
    var multiplo: number = 2;
    for (let digito of rutArreglo) {
      acumulador = acumulador + digito * multiplo;
      multiplo++;
      if (multiplo > 7) {
        multiplo = 2;
      }
    }
    var resto: number = acumulador % 11;
    var dvCalculado: any = 11 - resto;
    if (dvCalculado >= 11) {
      dvCalculado = '0';
    } else if (dvCalculado == 10) {
      dvCalculado = 'K';
    }

    var dvRut: string = rut.substring(rut.length - 1).toUpperCase();
    if (dvRut == dvCalculado.toString()) {
      return true;
    } else {
      return false;
    }
  }

  //validar edad:
  validarEdadMinima(edad_minima, fecha_nacimiento) {
    var fn = new Date(fecha_nacimiento);
    var timeDiff = Math.abs(Date.now() - fn.getTime());
    var edadAlumno = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    if (edadAlumno >= edad_minima) {
      return true;
    } else {
      return false;
    }
  }
}
