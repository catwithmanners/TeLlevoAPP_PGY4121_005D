/* import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { RouterModule, RouterPreloader } from "@angular/router";
import { environment } from "src/environments/environment";
import { HomePage } from "./home.page";


describe('PRUEBAS UNITARIAS: home', ()=> {
    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                RouterModule,
                RouterPreloader
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