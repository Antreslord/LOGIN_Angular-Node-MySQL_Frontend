import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/users'
  }

  //metodo SignIn
  SignIn(user: User): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`,user);
  }

  //metodo login
  login(user: User):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/login`, user)
  }
}
