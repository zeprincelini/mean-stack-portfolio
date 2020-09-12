import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //dev
  // private loginUrl = "http://localhost:3000/api/login";
  // private registerUrl = "http://localhost:3000/api/register";

  //prod
  private loginUrl = "https://shielded-ocean-66356.herokuapp.com/api/login";
  private registerUrl = "https://shielded-ocean-66356.herokuapp.com/api/register";

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user){
    return this.http.post<any>(this.registerUrl, user);
  }
  loginUser(user){
    return this.http.post<any>(this.loginUrl, user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(["/login"]);
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
