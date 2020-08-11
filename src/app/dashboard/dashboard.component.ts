import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
show = true;
display = '';
dash = true;
navLinks: any[];
activeLinkIndex = -1;
  constructor(private router: Router, private currentRoute: ActivatedRoute) {
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
  }
  appear(){
    this.show = !this.show;
    this.display= 'none';
  }
  toDash(){
    //this.router.navigate(['dashview'], {relativeTo: this.currentRoute});
    this.dash = !this.dash;
  }
  toAdd(){
    //this.router.navigate(['add'], {relativeTo: this.currentRoute});
    this.dash = !this.dash;
  }

}
