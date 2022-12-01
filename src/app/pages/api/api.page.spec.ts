import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment";
import { ApiPage } from "./api.page";


describe('PRUEBAS UNITARIAS: api', ()=> {
    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                HttpClientModule
            ],
            declarations:[
                ApiPage
            ]
        }).compileComponents();
    })

     it('1. Levantar la página api', ()=>{
       const fixture = TestBed.createComponent(ApiPage);
       const app = fixture.componentInstance;
       
       expect(app).toBeTruthy();
     });   

});