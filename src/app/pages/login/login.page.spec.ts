import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicStorageModule } from "@ionic/storage-angular";
import { environment } from "src/environments/environment";
import { LoginPage } from "./login.page";


describe('PRUEBAS UNITARIAS: login', ()=> {

  //configuración de ambiente:
  
  beforeEach( async () =>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        IonicStorageModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        LoginPage
      ]
    }).compileComponents();
  });

   it('1. Levantar la página login', ()=>{
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

  it('2. BOTÓN Iniciar sesión con credenciales correctas', ()=>{
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let correo = app.user.controls['correo'];
    let password = app.user.controls['password'];
    correo.setValue('a@duocuc.cl');
    password.setValue('asdasd123');

    app.login();
    expect(app.user.valid).toBeTruthy();
  }); 

  it('3. Iniciar sesión con correo incorrecto', ()=>{
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let correo = app.user.controls['correo'];
    let password = app.user.controls['password'];
    correo.setValue('a@ducuc.cl');
    password.setValue('asdasd123');

    expect(app.user.valid).toBeFalse();
  }); 

  it('4. Iniciar sesión con contraseña incorrecta', ()=>{
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let correo = app.user.controls['correo'];
    let password = app.user.controls['password'];
    correo.setValue('a@duocuc.cl');
    password.setValue('12');

    expect(app.user.valid).toBeFalse();
  }); 

    /*it('2. Formulario inválido', ()=>{
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let rut = app.user.controls['rut'];
    rut.setValue('19918561-6');

    expect(app.user.valid).toBeFalse();
  }); 

   it('3. Formulario válido', ()=>{
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let rut = app.user.controls['rut'];
    let nombre = app.user.controls['nombre'];
    rut.setValue('19918561-6');
    nombre.setValue('Alan');

    expect(app.user.valid).toBeFalse();
  });*/ 



});