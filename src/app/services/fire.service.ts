import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FireService {

  isAuthenticated= new BehaviorSubject(false);
  constructor(private fire: AngularFirestore) { }

  usuarios: any[] = [];
  //CRUD:
  agregar(coleccion, value, id){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
      return true;
    } catch (error) {
      console.log(error)
    }
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
