/* import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment";
import { PerfilPage } from "./perfil.page";
import { RouterTestingModule } from '@angular/router/testing';



describe('PRUEBAS UNITARIAS: perfil', ()=> {
    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                RouterTestingModule
                
            ],
            declarations:[
                PerfilPage                
            ]
        }).compileComponents();
    })

     it('1. Levantar la página perfil', ()=>{
       const fixture = TestBed.createComponent(PerfilPage);
       const app = fixture.componentInstance;
       
       
       expect(app).toBeTruthy();
     });   
}); */