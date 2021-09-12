import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApplicationusersService {
  // baseUrl = 'https://localhost:44320/api/';
  baseUrl = 'http://192.168.1.4/api/';
  constructor(private http:HttpClient) { }

  login(email: string, password : string) 
  {
    var body = {
      userName: email,
      password: password
    }
    return this.http.post(this.baseUrl +'applicationuser/login',body);
  }

  register(registerform : FormGroup) 
  {
    var body = {
      email: registerform.value.email,
      firstName: registerform.value.firstname,
      lastName: registerform.value.lastname,
      password: registerform.value.confirmpassword,
    }
    return this.http.post(this.baseUrl +'applicationuser/register',body);
  }
}
