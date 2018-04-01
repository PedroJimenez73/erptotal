import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-listado-prov',
  templateUrl: './listado-prov.component.html',
  styleUrls: ['./listado-prov.component.css']
})
export class ListadoProvComponent implements OnInit {

  proveedores:any;
  id;
  desde:number = 0;
  totales:number;
  
  constructor(private http: HttpClient,
              private proveedoresService: ProveedoresService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.cargarProveedores();
  }

  cargarProveedores(){
    this.proveedoresService.cargarProveedores(this.desde)
                .subscribe( (res: any) => {
                  this.proveedores= res.proveedores;
                  this.totales = res.totales;
                }, error =>{ 
                  console.log(error.error.mensaje)
                });
  }

  eliminaId(id){
    this.id = id;
  }

  eliminarProv(){
    this.proveedoresService.eliminarProv(this.id)
              .subscribe( (res: any) => {
                  console.log(res);
                  this.cargarProveedores();
                });
  }

  setDesde(valor){
    var desde = this.desde + valor;
    console.log(this.desde);
    if ( desde >= this.totales){
      return;
    } else if ( desde < 0) {
      return;
    } else {
      this.desde += valor;
      this.cargarProveedores();
    }
  }

}
