/* import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "src/environments/environment";
import { HomePage } from "./home.page";


describe('PRUEBAS UNITARIAS: home', ()=> {
    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                RouterTestingModule,
                ReactiveFormsModule
            ],
            declarations:[
                HomePage
            ]
        }).compileComponents();
    })

    it('1. Levantar la página home', ()=>{
      const fixture = TestBed.createComponent(HomePage);
      const app = fixture.componentInstance;
      
      expect(app).toBeTruthy();
    });  
}); */