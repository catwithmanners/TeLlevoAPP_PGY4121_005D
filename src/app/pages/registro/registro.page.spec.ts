import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { RegistroPage } from "./registro.page";

describe('PRUEBAS UNITARIAS: registro', ()=>{
    beforeEach( async () =>{
        await TestBed.configureTestingModule({
            imports: [
            ReactiveFormsModule,
            FormsModule,
            AngularFireModule.initializeApp(environment.firebaseConfig)
        ],
        declarations: [
            RegistroPage
        ]
        }).compileComponents();
    });

       it('1. Levantar la página registro', ()=>{
        const fixture = TestBed.createComponent(RegistroPage);
        const app = fixture.componentInstance;
        
        expect(app).toBeTruthy();
      });  

    

       it('2. Registro de usuario válido', ()=>{
        const fixture = TestBed.createComponent(RegistroPage);
        const app = fixture.componentInstance;

        let rut = app.usuario.controls['rut'];
        let nombre = app.usuario.controls['nombre'];
        let apellidos = app.usuario.controls['apellidos'];
        let fecha_nac = app.usuario.controls['fecha_nac'];
        let sede = app.usuario.controls['sede'];
        let carrera = app.usuario.controls['carrera'];
        let correo = app.usuario.controls['correo'];
        let password = app.usuario.controls['password']; 
        let tipo_usuario = app.usuario.controls['tipo_usuario']; 
        let licencia = app.usuario.controls['licencia']; 
        let img = app.usuario.controls['img']; 

        rut.setValue('19.918.561-6');
        nombre.setValue('Alan');
        apellidos.setValue('Zamorano');
        fecha_nac.setValue('1998/06/09');
        sede.setValue('Puente Alto');
        carrera.setValue('Ing Informatica');
        correo.setValue('a@duocuc.cl');
        password.setValue('asdasd123');
        tipo_usuario.setValue('alumno');
        licencia.setValue('Ninguno');
        img.setValue('default');

        expect(app.usuario.valid).toBeTrue();
    });  

       it('3. Registro de usuario inválido: RUT', ()=>{
        const fixture = TestBed.createComponent(RegistroPage);
        const app = fixture.componentInstance;

        let rut = app.usuario.controls['rut'];
        let nombre = app.usuario.controls['nombre'];
        let apellidos = app.usuario.controls['apellidos'];
        let fecha_nac = app.usuario.controls['fecha_nac'];
        let sede = app.usuario.controls['sede'];
        let carrera = app.usuario.controls['carrera'];
        let correo = app.usuario.controls['correo'];
        let password = app.usuario.controls['password']; 
        let tipo_usuario = app.usuario.controls['tipo_usuario']; 
        let licencia = app.usuario.controls['licencia']; 
        let img = app.usuario.controls['img']; 

        rut.setValue('aa.aaa.aaa-1'); /* RUT INVÁLIDO CON LETRAS */
        nombre.setValue('Alan');
        apellidos.setValue('Zamorano');
        fecha_nac.setValue('1998/06/09');
        sede.setValue('Puente Alto');
        carrera.setValue('Ing Informatica');
        correo.setValue('a@duocc.cl');
        password.setValue('asdasd123');
        tipo_usuario.setValue('alumno');
        licencia.setValue('Ninguno');
        img.setValue('default');

        expect(app.usuario.valid).toBeFalse();
    });  

       it('4. Registro de usuario inválido: NOMBRE Y APELLIDO', ()=>{
        const fixture = TestBed.createComponent(RegistroPage);
        const app = fixture.componentInstance;

        let rut = app.usuario.controls['rut'];
        let nombre = app.usuario.controls['nombre'];
        let apellidos = app.usuario.controls['apellidos'];
        let fecha_nac = app.usuario.controls['fecha_nac'];
        let sede = app.usuario.controls['sede'];
        let carrera = app.usuario.controls['carrera'];
        let correo = app.usuario.controls['correo'];
        let password = app.usuario.controls['password']; 
        let tipo_usuario = app.usuario.controls['tipo_usuario']; 
        let licencia = app.usuario.controls['licencia']; 
        let img = app.usuario.controls['img']; 

        rut.setValue('19.918.561-6');
        nombre.setValue('Al'); /* CARÁCTERES INSUFICIENTES */
        apellidos.setValue('Zam'); /* CARÁCTERES INSUFICIENTES */
        fecha_nac.setValue('1998/06/09');
        sede.setValue('Puente Alto');
        carrera.setValue('Ing Informatica');
        correo.setValue('a@duocc.cl');
        password.setValue('asdasd123');
        tipo_usuario.setValue('alumno');
        licencia.setValue('Ninguno');
        img.setValue('default');

        expect(app.usuario.valid).toBeFalse();
    });  

       it('5. Registro de usuario inválido: CONTRASEÑA', ()=>{
        const fixture = TestBed.createComponent(RegistroPage);
        const app = fixture.componentInstance;

        let rut = app.usuario.controls['rut'];
        let nombre = app.usuario.controls['nombre'];
        let apellidos = app.usuario.controls['apellidos'];
        let fecha_nac = app.usuario.controls['fecha_nac'];
        let sede = app.usuario.controls['sede'];
        let carrera = app.usuario.controls['carrera'];
        let correo = app.usuario.controls['correo'];
        let password = app.usuario.controls['password']; 
        let tipo_usuario = app.usuario.controls['tipo_usuario']; 
        let licencia = app.usuario.controls['licencia']; 
        let img = app.usuario.controls['img']; 

        rut.setValue('19.918.561-6');
        nombre.setValue('Alan'); 
        apellidos.setValue('Zamorano');
        fecha_nac.setValue('1998/06/09');
        sede.setValue('Puente Alto');
        carrera.setValue('Ing Informatica');
        correo.setValue('a@duocuc.cl');
        password.setValue('1');
        tipo_usuario.setValue('alumno');
        licencia.setValue('Ninguno');
        img.setValue('default');

        expect(app.usuario.valid).toBeFalse();
    });  

       it('6. Registro de usuario inválido: CAMPO SEDE Y CARRERA', ()=>{
        const fixture = TestBed.createComponent(RegistroPage);
        const app = fixture.componentInstance;

        let rut = app.usuario.controls['rut'];
        let nombre = app.usuario.controls['nombre'];
        let apellidos = app.usuario.controls['apellidos'];
        let fecha_nac = app.usuario.controls['fecha_nac'];
        let sede = app.usuario.controls['sede'];
        let carrera = app.usuario.controls['carrera'];
        let correo = app.usuario.controls['correo'];
        let password = app.usuario.controls['password']; 
        let tipo_usuario = app.usuario.controls['tipo_usuario']; 
        let licencia = app.usuario.controls['licencia']; 
        let img = app.usuario.controls['img']; 

        rut.setValue('19.918.561-6');
        nombre.setValue('Alan'); 
        apellidos.setValue('Zamorano');
        fecha_nac.setValue('1998/06/09');
        sede.setValue('');
        carrera.setValue('');
        correo.setValue('a@duocuc.cl');
        password.setValue('asdasd123');
        tipo_usuario.setValue('alumno');
        licencia.setValue('Ninguno');
        img.setValue('default');

        expect(app.usuario.valid).toBeFalse();
    });  

       it('7. Registro de usuario inválido: CARÁCTERES INVÁLIDOS', ()=>{
        const fixture = TestBed.createComponent(RegistroPage);
        const app = fixture.componentInstance;

        let rut = app.usuario.controls['rut'];
        let nombre = app.usuario.controls['nombre'];
        let apellidos = app.usuario.controls['apellidos'];
        let fecha_nac = app.usuario.controls['fecha_nac'];
        let sede = app.usuario.controls['sede'];
        let carrera = app.usuario.controls['carrera'];
        let correo = app.usuario.controls['correo'];
        let password = app.usuario.controls['password']; 
        let tipo_usuario = app.usuario.controls['tipo_usuario']; 
        let licencia = app.usuario.controls['licencia']; 
        let img = app.usuario.controls['img']; 

        rut.setValue('##.###.###-#');
        nombre.setValue('####'); 
        apellidos.setValue('########');
        fecha_nac.setValue('$$$$/$$/$$');
        sede.setValue('Puente Alto');
        carrera.setValue('Ing Informatica');
        correo.setValue('a@duocuc.cl');
        password.setValue('asdasd123');
        tipo_usuario.setValue('alumno');
        licencia.setValue('Ninguno');
        img.setValue('default');

        expect(app.usuario.valid).toBeFalse();
    });  

/*        it('8. Registro de usuario botón registrar', ()=>{
        const fixture = TestBed.createComponent(RegistroPage);
        const app = fixture.componentInstance;

        let rut = app.usuario.controls['rut'];
        let nombre = app.usuario.controls['nombre'];
        let apellidos = app.usuario.controls['apellidos'];
        let fecha_nac = app.usuario.controls['fecha_nac'];
        let sede = app.usuario.controls['sede'];
        let carrera = app.usuario.controls['carrera'];
        let correo = app.usuario.controls['correo'];
        let password = app.usuario.controls['password']; 
        let tipo_usuario = app.usuario.controls['tipo_usuario']; 
        let licencia = app.usuario.controls['licencia']; 
        let img = app.usuario.controls['img']; 

        rut.setValue('19.918.561-6');
        nombre.setValue('Alan'); 
        apellidos.setValue('Zamorano');
        fecha_nac.setValue('1998/06/09');
        sede.setValue('Puente Alto');
        carrera.setValue('Ing Informatica');
        correo.setValue('a@duocuc.cl');
        password.setValue('asdasd123');
        tipo_usuario.setValue('alumno');
        licencia.setValue('Ninguno');
        img.setValue('default');

        app.registrar();
        expect(app.v_registrar).toBeTruthy;
    });  
 */
 
});