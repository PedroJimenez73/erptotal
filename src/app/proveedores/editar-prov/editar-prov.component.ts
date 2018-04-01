import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../../servicios/proveedores.service';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-editar-prov',
  templateUrl: './editar-prov.component.html',
  styleUrls: ['./editar-prov.component.css']
})
export class EditarProvComponent implements OnInit {

  proveedorForm: FormGroup;
  proveedor:any;
  id:any;
  provincias:string[] = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

  usuario:any;


  constructor(private pf: FormBuilder,
              private http: HttpClient,
              private proveedoresService: ProveedoresService,
              private router: Router,
              private route: ActivatedRoute,
              private usuariosService: UsuariosService) { 
                if(!this.proveedor){
                  this.proveedor={}
              }
              this.usuario = usuariosService.usuario;
            }

  ngOnInit() {
    this.getId(this.route.snapshot.params['id']);
    this.proveedorForm = this.pf.group({
      nombre: null,
      cif: null,
      domicilio: null,
      cp: null,
      localidad: null,
      provincia: null,
      telefono: null,
      email: null
    });
  }

  getId(id){
    this.proveedoresService.getProveedorId(id)
                        .subscribe( (res: any) => {
                          this.proveedor= res.proveedor;
                        });
    this.id = id;
  }

  

  onSubmit(){
    this.proveedor = this.saveProveedor();
    this.proveedoresService.editarProveedor(this.id, this.proveedor)
              .subscribe( (res: any) => {
                console.log(res);
                this.router.navigate(['/lista-proveedores']);
              });
  }

  saveProveedor(){
    const saveProveedor = {
      nombre: this.proveedorForm.get('nombre').value,
      cif: this.proveedorForm.get('cif').value,
      domicilio: this.proveedorForm.get('domicilio').value,
      cp: this.proveedorForm.get('cp').value,
      localidad: this.proveedorForm.get('localidad').value,
      provincia: this.proveedorForm.get('provincia').value,
      telefono: this.proveedorForm.get('telefono').value,    
      email: this.proveedorForm.get('email').value,          
    }

    return saveProveedor;
  }

  getAutorizacion(){
    if (this.usuario.role === 'admin' || this.usuario.role === 'key-user') {
      return true;
    } else {
      return false;
    }
  }

}
