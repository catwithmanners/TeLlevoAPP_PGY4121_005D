import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { AppRoutingModule } from "src/app/app-routing.module";
import { environment } from "src/environments/environment";
import { InfoPage } from "./info.page";



describe('PRUEBAS UNITARIAS: api/info', ()=> {
    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports: [
                AngularFireModule.initializeApp(environment.firebaseConfig),
                HttpClientModule,
                AppRoutingModule
            ],
            declarations:[
                InfoPage
            ]
        }).compileComponents();
    })

     it('1. Levantar la página info', ()=>{
       const fixture = TestBed.createComponent(InfoPage);
       const app = fixture.componentInstance;
       
       expect(app).toBeTruthy();
     });   
});