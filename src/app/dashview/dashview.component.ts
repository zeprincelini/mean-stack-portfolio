import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-dashview',
  templateUrl: './dashview.component.html',
  styleUrls: ['./dashview.component.css']
})

export class DashviewComponent implements OnInit {
  postData = [{}]
  id : any;
  myUrl: any;
  deleteStatus = false;
  constructor(private dashService: DashboardService, private route: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getAllPosts();
  }
  getAllPosts(){
    this.dashService.getPosts()
    .subscribe(
      (res) => {this.postData = res;
      console.log(this.postData)}
    )
  }

  onDelete(id){
    if(confirm("Are you sure you want to delete?") == true){
      this.dashService.deletePost(id)
      .subscribe(
        res => this.deleteStatus = true,
        err => console.log(err)
      )
    }
  }
}
