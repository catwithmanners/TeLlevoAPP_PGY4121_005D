import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { resolve } from 'dns';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  isAuthenticated= new BehaviorSubject(false);
  constructor(
    private fire: AngularFirestore, 
    private router: Router,
    private storage: AngularFireStorage ) {}

  usuarios: any[] = [];
  datos: any[] = [];
  viajes: any;
  viaje: any;
  url: String;
  downloadURL: Observable <string>;
  //variable de prueba
  v_registrar = false; 
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

  async cargarImg(file: any, path: string, nombre: string): Promise <String> {
    return new Promise(async() => {
      const filepath = path + '/' + nombre;
      console.log(filepath)
      const ref = await this.storage.ref(filepath);
      const task = ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = ref.getDownloadURL() )
      )
    })
  }

  async obtenerFoto(path, rut){
    const filepath = path + '/' + rut;  /* nombre de ruta de archivos */
    const ref = this.storage.ref(filepath);
    this.downloadURL = ref.getDownloadURL();
    return this.downloadURL;
  }

  async cargarDatos(coleccion){
    //this.usuarios = await this.storage.getDatos(this.KEY_USUARIOS);
    await this.getDatos(coleccion).subscribe(
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

  getDato(coleccion, id){
    try{
      return this.fire.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log(error)
    }
  }

  async loginUser(user, password){
    await this.getDatos('usuarios').subscribe(
      response => {
        this.usuarios = [];
        for (let usuario of response){
          let user = usuario.payload.doc.data();
          this.usuarios.push(user);
        }
      }
    );

    var userLogin = this.usuarios.find(usu => usu.correo == user && usu.password == password);
    if (userLogin != undefined) {
      this.isAuthenticated.next(true);
      return userLogin;
    }
    
  }

  modificar(coleccion, id, value){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.error(error);
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
