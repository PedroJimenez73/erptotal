import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuariosService } from '../usuarios.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private usuariosService: UsuariosService){}

  canActivate() {
      if (this.usuariosService.loged()){
        return true;
      } else {
        return false;
      }
  }
}
