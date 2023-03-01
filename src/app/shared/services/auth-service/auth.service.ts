import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loginUrl = `${environment.BASE_URL}/login`;
  private registerUrl = `${environment.BASE_URL}/register`;

  constructor(private http: HttpClient, private router: Router) {}

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }
  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  logOut() {
    localStorage.removeItem("token");
    this.router.navigate(["/admin/login"]);
  }

  getToken() {
    return localStorage.getItem("token");
  }
}
