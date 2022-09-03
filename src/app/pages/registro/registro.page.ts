import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    fecha_nac: new FormControl('', [Validators.required]),
    sede: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    carrera: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    correo: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(9)]),
    tipo_usuario: new FormControl('alumno')
  });
  //Variable para verificar la contraseña:
  verificar_pw: string;
  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  registrar(){
    if (this.usuario.controls.password.value != this.verificar_pw){
      alert('¡Las contraseñas no coinciden!')
      return;
    }
    this.usuarioService.agregarUsuario(this.usuario.value);
    this.usuario.reset();
    alert('¡Usuario registrado!');
    this.router.navigate(['/login']);
  }
}
