import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-crear-prov',
  templateUrl: './crear-prov.component.html',
  styleUrls: ['./crear-prov.component.css']
})
export class CrearProvComponent implements OnInit {

  proveedorForm: FormGroup;
  proveedor:any;
  provincias:string[] = ['Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres',
  'Cádiz','Cantabria','Castellón','Ciudad Real','Córdoba','La Coruña','Cuenca','Gerona','Granada','Guadalajara',
  'Guipúzcoa','Huelva','Huesca','Islas Baleares','Jaén','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra',
  'Orense','Palencia','Las Palmas','Pontevedra','La Rioja','Salamanca','Segovia','Sevilla','Soria','Tarragona',
  'Santa Cruz de Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya','Zamora','Zaragoza']

  mensaje:string;

  constructor(private pf: FormBuilder,
    private http: HttpClient,
    private proveedoresService: ProveedoresService,
    private router: Router) { }

  ngOnInit() {
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

  onSubmit(){
    this.proveedor = this.saveProveedor();
    this.proveedoresService.crearProveedor(this.proveedor)
                    .subscribe( (res: any) => {
                      console.log(res);
                      this.router.navigate(['/lista-proveedores']);
                    }, (error:any) =>{ 
                        if(error.error.errores.errors.nombre){
                          console.log(error.error.errores.errors.nombre.message);                        
                        } else if (error.error.errores.errors.cif) {
                          console.log(error.error.errores.errors.cif.message);                        
                        } else {
                          console.log(error.error.mensaje)
                        }
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

}
