import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { GeoPage } from "./geo.page";

describe('PRUEBAS UNITARIAS: geo', ()=>{
    beforeEach( async () => {
        await TestBed.configureTestingModule({
            imports: [
                ReactiveFormsModule,
                FormsModule,
                AngularFireModule.initializeApp(environment.firebaseConfig)
            ],
            declarations: [
                GeoPage
            ]
        }).compileComponents();
    })

/*     it('1. Levantar la página geo', ()=>{
        const fixture = TestBed.createComponent(GeoPage);
        const app = fixture.componentInstance;
        
        let google = app.
        expect(app).toBeTruthy();
      });   */


});