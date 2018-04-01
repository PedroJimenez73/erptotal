import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../servicios/usuarios.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
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
    ]),
    trigger('nuevo', [
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
export class UsuariosComponent implements OnInit {

  usuarioForm: FormGroup;
  usuarios:any;
  usuario:any;
  nombre:any;
  email:any;
  role:any;
  editFile:any;
  id;
  mensaje:any;

  show = false;
  showNuevo = false;

  crearUsuarioForm: FormGroup;
  nuevoUsuario;
  
  constructor(private pf: FormBuilder,
              private http: HttpClient,
              private usuariosService: UsuariosService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.usuarioForm = this.pf.group({
      nombre: null,
      email: null,
      role: null
    });
    this.crearUsuarioForm = this.pf.group({
      nombre: null,
      email: null,
      password: null,
      role: null
    });
    this.cambiar();
  }

  get stateName() {
    return this.show ? 'show' : 'hide'
  }

  get stateNuevo() {
    return this.showNuevo ? 'show' : 'hide'
  }

  showFormNuevo(){
    this.showNuevo = !this.showNuevo;
  }

  cambiar(){
    this.crearUsuarioForm.valueChanges.subscribe(()=>{
      if(this.show){
        this.show = false;
      }
    })
  }

  cargarUsuarios(){
    this.usuariosService.cargarUsuarios()
                              .subscribe( (usuarios: any) => {
                                this.usuarios= usuarios;
                                console.log(this.usuarios)
                              });
  }

  onSubmit(id){
    this.usuario = this.saveUsuario();
    console.log(this.usuario);
    this.usuariosService.editarUsuario(id, this.usuario)
              .subscribe( (res: any) => {
                console.log(res);
              });
    this.editFile = '';
  }

  saveUsuario(){
    const saveUsuario = {
      nombre: this.usuarioForm.get('nombre').value,
      email: this.usuarioForm.get('email').value,
      role: this.usuarioForm.get('role').value,          
    }

    return saveUsuario;
  }
  editUsuario(id){
    this.editFile = id;
  }

  cancelarEdicion(){
    this.editFile = '';
    this.cargarUsuarios();
  }

  guardarNuevoUsuario(){
    this.nuevoUsuario = this.guardarUsuario();
    console.log(this.nuevoUsuario);
    this.usuariosService.crearUsuario(this.nuevoUsuario)
    .subscribe( (res: any) => {
      console.log(res);
      this.crearUsuarioForm.reset();
      this.cargarUsuarios();
      this.mensaje = 'El usuario ha sido creado correctamente';
      this.show = true;
      setTimeout(()=>{this.show = false;}, 2000);
    }, error =>{ 
      if(error.error.errores.errors.email.message){
        this.mensaje = error.error.errores.errors.email.message;
        this.show = !this.show;
      } else if (error) {
        console.log(error);
      }
    });
  }

  guardarUsuario(){
    const guardarUsuario = {
      nombre: this.crearUsuarioForm.get('nombre').value,
      email: this.crearUsuarioForm.get('email').value,
      password: this.crearUsuarioForm.get('password').value,
      role: this.crearUsuarioForm.get('role').value,          
    }

    return guardarUsuario;
  }

  eliminaId(id){
    this.id = id;
  }

  borrarUsuario(){
    this.usuariosService.eliminarUsuario(this.id)
              .subscribe( (res: any) => {
                  console.log(res);
                  this.cargarUsuarios();
                  this.mensaje = 'El usuario ha sido eliminado correctamente';
                  this.show = true;
                  setTimeout(()=>{this.show = false;}, 2000);
                });
  }


}
