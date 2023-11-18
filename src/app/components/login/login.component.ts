import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private _userService:UserService,
    private toastr: ToastrService,
    private router:Router
    ){

  }

  login(){

    if(this.username == '' || this.password == ''){
      this.toastr.warning('Todos los campos son Obligatorios', 'Advertencia');
      return;
    }

    this.loading = true;

    //Creamos el body
    const user:User = {
      username: this.username,
      password: this.password
    }

    //Llamar el servicio
    this._userService.login(user).subscribe({
      next: (token) => {
        this.router.navigate(['dashboard']);
        localStorage.setItem('token', token)
      },
      error: (e:HttpErrorResponse) => {
        this.loading = false;
        
        if(e.error.msg){
          this.toastr.error(e.error.msg, 'Acceso Denegado')
        }else{
          this.toastr.error('Error del servidor','Error')
        }

      }
    })

  }

}
