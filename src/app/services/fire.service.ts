import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FireService {

  isAuthenticated= new BehaviorSubject(false);
  constructor(private fire: AngularFirestore) { }

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

  getAuth(){
    return this.isAuthenticated.value;
  }

}
