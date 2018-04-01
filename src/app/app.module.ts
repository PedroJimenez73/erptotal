import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListadoProvComponent } from './proveedores/listado-prov/listado-prov.component';
import { CrearProvComponent } from './proveedores/crear-prov/crear-prov.component';
import { EditarProvComponent } from './proveedores/editar-prov/editar-prov.component';
import { ProveedoresService } from './servicios/proveedores.service';
import { LoginComponent } from './autenticacion/login/login.component';
import { UsuariosComponent } from './autenticacion/usuarios/usuarios.component';
import { UsuariosService } from './servicios/usuarios.service';
import { RegisterComponent } from './autenticacion/register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginGuard } from './servicios/guards/login.guard';
import { PdfsService } from './servicios/pdfs.service';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [LoginGuard] },
  { path: 'crear-proveedor', component: CrearProvComponent, canActivate: [LoginGuard] },
  { path: 'lista-proveedores', component: ListadoProvComponent, canActivate: [LoginGuard] },
  { path: 'editar-proveedor/:id', component: EditarProvComponent, canActivate: [LoginGuard] },
  { path: '**', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ListadoProvComponent,
    CrearProvComponent,
    EditarProvComponent,
    LoginComponent,
    UsuariosComponent,
    RegisterComponent,
    NavbarComponent
    ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ProveedoresService, UsuariosService, LoginGuard, PdfsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
