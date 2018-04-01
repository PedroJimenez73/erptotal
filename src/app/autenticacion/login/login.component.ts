import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('alerta', [
      state('show', style({
        opacity: 1
      })),
      state('hide',   style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  credenciales:any;

  enviando:boolean = false;
  mensaje:any;

  show = false;

  constructor(private lf: FormBuilder,
              private usuariosService: UsuariosService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.lf.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  get stateName() {
    return this.show ? 'show' : 'hide'
  }

  login(){
    this.credenciales = this.guardarCredenciales();
    this.usuariosService.login(this.credenciales)
                            .subscribe( (res: any) => {
                                console.log(res);
                                this.router.navigate(['/usuarios']);
                              }, error =>{ 
                                console.log(error.error.mensaje)
                                if(error.error.mensaje === "email"){
                                  this.mensaje = "No existe ninguna cuenta para ese correo";
                                  this.show = true;
                                } else if(error.error.mensaje === "password"){
                                  this.mensaje = "Contraseña errónea";
                                  this.show = true;
                                } else {
                                  this.mensaje = "Error de conexión, inténtelo de nuevo más tarde";
                                  this.show = true;
                                }
                              });
  }

  guardarCredenciales(){
    const guardarCredenciales = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }

    return guardarCredenciales;
  }

}
