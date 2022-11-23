import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {

  //variables
  titanes: any [] = [];
  cantidad: number;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let datos = this.apiService.getDatos();
    console.log(datos);
    //OBSERVABLE: para recorrer un observable, se subscribe.
    datos.subscribe(
      (dataSNK: any) => {
        console.log(dataSNK)
        this.cantidad = dataSNK.length;
        this.titanes = dataSNK;
        console.log(this.titanes);
      }
      );
    }
}
