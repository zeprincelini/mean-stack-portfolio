import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-img-view',
  templateUrl: './img-view.component.html',
  styleUrls: ['./img-view.component.css']
})
export class ImgViewComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toContact (){
    this.router.navigate(['/contact']);
  }
}
