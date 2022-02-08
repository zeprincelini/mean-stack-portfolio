import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth-service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  logError = false;
  loginUserData: any = {
    username: "",
    password: "",
  };
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.auth.loginUser(this.loginUserData).subscribe(
      (res) => {
        this.router.navigate(["/admin/dashboard"]);
        localStorage.setItem("token", res.token);
      },
      (err) => {
        this.logError = true;
      }
    );
  }
  register() {
    this.auth.registerUser(this.loginUserData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
