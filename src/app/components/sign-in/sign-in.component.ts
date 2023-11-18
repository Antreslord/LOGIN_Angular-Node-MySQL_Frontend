import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  username: string = '';
  password: string = '';
  repeatPassword: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userService: UserService,
    private router: Router
    ){}

  addUser(){
    //validacion de valores
    if(this.username == '' || this.password == '' || this.repeatPassword == ''){
      this.toastr.warning('Todos los campos deben diligenciados','Advertencia');
      return;
    }

    //validar passwords
    if(this.password != this.repeatPassword){
      this.toastr.warning('Las contraseñas ingresadas No Coinciden','Advertencia');
      return;
    }
    
    this.loading = true

    //crear el objeto
    const user:User = {
      username: this.username,
      password: this.repeatPassword
    }

    this._userService.SignIn(user).subscribe({
      next: (v) =>{
        this.toastr.success(`El usuario ${this.username} registrado exitosamente`, 'Usuario Registrado');
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (e:HttpErrorResponse) => {
        
        this.loading = false;
        if(e.error.msg){
          this.toastr.error(e.error.msg, 'Usuario Registrado')
        }else{
          this.toastr.error('Error del servidor','Error')
        }
      }
    })

  }

}
