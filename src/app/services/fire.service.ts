import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private fire: AngularFirestore) { }

  //CRUD:
  agregar(coleccion, value){
    try {
      this.fire.collection(coleccion).add(value);
    } catch (error) {
      console.log(error)
    }
  }

}
