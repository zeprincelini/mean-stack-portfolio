import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {};
  constructor(private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    //this.holder = this.route.snapshot.data['showRootComponents'].emit;
  };
  onLogin(form: HTMLFormElement){
    console.log(form);
  }
  login(){
    this.auth.loginUser(this.loginUserData)
    .subscribe(
      
    )
  }
}
