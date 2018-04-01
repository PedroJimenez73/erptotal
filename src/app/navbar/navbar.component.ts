import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  usuario:any;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() { 
  }

  getLoged(){
    this.getUsuario();
    return this.usuariosService.loged();
  }

  getUsuario(){
    this.usuario = this.usuariosService.usuario;

  }


}
