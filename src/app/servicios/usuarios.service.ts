import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';



@Injectable()
export class UsuariosService {

  mensaje:any;
  usuario:string;
  token:string;

  constructor(private http: HttpClient,
              private router: Router) { 
    this.cargarCredenciales();
  }

  crearUsuario(usuario){
    let url = 'http://localhost:3000/usuario';
    return this.http.post(url, usuario)
                      .map( (resp: any) => {
                        return resp.usuario;
                      })
                      .catch(err =>{
                        console.log(err.error.errores.errors.email.message);          
                        return Observable.throw( err );
                      })
  }

  mensajesError(){
    console.log(this.mensaje);
    return this.mensaje;
  }

  cargarUsuarios(){
    let url = 'http://localhost:3000/usuario';
    return this.http.get( url )
                  .map( (resp: any) => {
                    return resp;
                   });
  }

  getUsuarioId(id){
    let url = 'http://localhost:3000/usuario';
    return this.http.get(url+id)
                  .map( (resp: any) => {
                    return resp;
                  });
  }

  editarUsuario(id, usuario){
    let url = 'http://localhost:3000/usuario/';
    return this.http.put(url+id, usuario)
                      .map( (resp: any) => {
                        return resp;
                      });
  }

  eliminarUsuario(id){
    let url = `http://localhost:3000/usuario/${id}`;

    return this.http.delete( url )
              .map( resp => {
                return resp;
              });
  }

  login(usuario){
    let url = 'http://localhost:3000/login/';
    return this.http.post(url, usuario)
                      .map( (resp:any) => {
                        this.almacenarCredenciales(resp.id, resp.token, resp.usuario);
                        return true;
                      });
  }

  cargarCredenciales(){
    if (localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = '';
    }
  }

  almacenarCredenciales(id:string, token:string, usuario:string ){
    localStorage.setItem('id', id );
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loged(){
    return ( this.token.length > 0 ) ? true : false;
  }

  logout(){
    this.usuario = '',
    this.token = ''

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }


}
