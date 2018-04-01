import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { UsuariosService } from './usuarios.service';


@Injectable()
export class ProveedoresService {

  token:string;

  constructor(private http: HttpClient,
              private usuariosService: UsuariosService) { 
                this.token = usuariosService.token;
              }

  crearProveedor(proveedor){
    let url = 'http://localhost:3000/proveedor';
    url += '?token=' + this.token;
    return this.http.post(url, proveedor)
                      .map( (resp: any) => {
                        return resp;
                      });
  }

  cargarProveedores(desde=0){
    // let url = 'http://localhost:3000/proveedor';
    let url = 'http://localhost:3000/proveedor?desde=' + desde;
    return this.http.get( url )
                  .map( (resp: any) => {
                    return resp;
                   });
  }

  getProveedorId(id){
    let url = 'http://localhost:3000/proveedor';
    return this.http.get('http://localhost:3000/proveedor/'+id)
                  .map( (resp: any) => {
                    return resp;
                  });
  }

  editarProveedor(id, proveedor){
    let url = 'http://localhost:3000/proveedor';
    return this.http.put('http://localhost:3000/proveedor/'+id, proveedor)
                      .map( (resp: any) => {
                        return resp;
                      });
  }

  eliminarProv(id){
    let url = `http://localhost:3000/proveedor/${id}`;

    return this.http.delete( url )
              .map( resp => {
                return resp;
              });
  }
}
