import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FireService {

  isAuthenticated= new BehaviorSubject(false);
  constructor(private fire: AngularFirestore, private router: Router) { }

  usuarios: any[] = [];
  datos: any[] = [];
  viajes: any;
  viaje: any;
  //CRUD:
  agregar(coleccion, value, id){
    try {
      //this.cargarDatos(coleccion);
      //this.datos.push(this.getDatos(coleccion));
      //console.log('Valor this.datos' + this.datos)
      //if (coleccion == 'usuarios') {
        //console.log(this.datos);
        //var rutUser = this.datos.find(usu => usu.rut == value.rut);
        //console.log('datos del rutUser: '+rutUser);
        //if (rutUser == undefined ) {
      if (coleccion == 'viajes') {
        this.fire.collection(coleccion).add(value);
        return true;
      } else {
        this.fire.collection(coleccion).doc(id).set(value);
        return true;
      }
        //}else{
          return false;
        //}
      //}
    } catch (error) {
      console.log(error)
    }
  }
  cargarDatos(coleccion){
    //this.usuarios = await this.storage.getDatos(this.KEY_USUARIOS);
    this.getDatos(coleccion).subscribe(
      response => {
        this.datos = [];
        for (let usuario of response){
          this.datos.push(usuario.payload.doc.data());
          console.log('Cargar Datos: '+this.datos)
        }
      }
    );
  }
  eliminar(coleccion, id){
    try {
      this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }

  actualizar(coleccion, id, value){
    this.fire.collection(coleccion).doc(id).set(value);
    return true;
  }

  regPasajero(coleccion, id, value){
    //this.viajes = this.getDatos('viajes');
    //this.viaje = this.viajes.find(dato => dato.rut == rut);
    this.fire.collection(coleccion).doc(id).set(value);
  }

  getDatos(coleccion){
    try{
      return this.fire.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log(error)
    }
  }

  loginUser(user, password){
    this.getDatos('usuarios').subscribe(
      response => {
        this.usuarios = [];
        for (let usuario of response){
          this.usuarios.push(usuario.payload.doc.data());
        }
      }
    );
    var userLogin = this.usuarios.find(usu => usu.correo == user && usu.password == password);
    if (userLogin != undefined) {
      this.isAuthenticated.next(true);
      return userLogin;
    }
  }
  admitir(){
    this.isAuthenticated.next(true);
  }
  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  getAuth(){
    return this.isAuthenticated.value;
  }

    /* RECUPERAR */
    async validarCorreo(correo){
      this.getDatos('usuarios').subscribe(
        response => {
          this.usuarios = [];
          for (let usuario of response){
            this.usuarios.push(usuario.payload.doc.data(correo));
          }
        }
      )
    }
}
