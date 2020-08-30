import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardService } from '../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
show = true;
log= false;
display = '';
dash = true;
navLinks: any[];
activeLinkIndex = -1;
  constructor(private router: Router, private currentRoute: ActivatedRoute,
     private dashService: DashboardService,
     private auth: AuthService) {
    this.navLinks = [
      {
        label: 'Dashboard',
        link: './dashview',
        index: 0
      }, {
        label: 'Add Post',
        link: './add',
        index: 1
      }
    ];
   }
  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

    this.dashService.getDashboard()
    .subscribe(
      res => console.log(res),
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(["/login"])
          }
        }
      }
    )
  }
  appear(){
    this.show = !this.show;
    this.display= 'none';
    this.log = !this.log;
  }
  toDash(){
    this.router.navigate(['dashview'], {relativeTo: this.currentRoute});
    this.dash = !this.dash;
  }
  toAdd(){
    this.router.navigate(['add'], {relativeTo: this.currentRoute});
    this.dash = !this.dash;
  }

  logOut(){
    this.auth.logOut();
  }

}
