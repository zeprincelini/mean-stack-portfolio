import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashhome',
  templateUrl: './dashhome.component.html',
  styleUrls: ['./dashhome.component.css']
})
export class DashhomeComponent implements OnInit {
  constructor(private router: Router, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  toDash(){
    this.router.navigate(['/dashview']);
  }
  toAdd(){
    this.router.navigate(['/add']);
  }

}
