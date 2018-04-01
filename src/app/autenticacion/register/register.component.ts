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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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

export class RegisterComponent implements OnInit {

  registroForm: FormGroup;
  nuevoUsuario:any;
  enviando:boolean = false;
  mensaje:any;

  show = false;

  constructor(private rf: FormBuilder,
    private router: Router,
    private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.registroForm = this.rf.group(
      {
        'nombre': ['', Validators.required],
        'email': ['', [Validators.required, 
                       Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        'password': ['', [Validators.required, 
                       Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
        'confirm': ''
      }
    )
    this.cambiar();
  }

  cambiar(){
    this.registroForm.valueChanges.subscribe(()=>{
      if(this.show){
        this.show = !this.show;
      }
    })
  }

  get stateName() {
    return this.show ? 'show' : 'hide'
  }

  guardarNuevoUsuario(){
    this.enviando = true;
    this.nuevoUsuario = this.guardarUsuario();
    console.log(this.nuevoUsuario);
    this.usuariosService.crearUsuario(this.nuevoUsuario)
    .subscribe( (res: any) => {
      this.router.navigate(['/usuarios']);
    }, error =>{ 
      if(error.error.errores.errors.email.message){
        this.enviando = false;
        this.mensaje = error.error.errores.errors.email.message;
        this.show = !this.show;
      } else if (error) {
        console.log(error);
      }
    });
  }

  guardarUsuario(){
    const guardarUsuario = {
      nombre: this.registroForm.get('nombre').value,
      email: this.registroForm.get('email').value,
      password: this.registroForm.get('password').value,
      role: 'user',          
    }

    return guardarUsuario;
  }

}
