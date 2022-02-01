import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/shared/services/dashboard-service/dashboard.service";

@Component({
  selector: "app-dashview",
  templateUrl: "./dashview.component.html",
  styleUrls: ["./dashview.component.css"],
})
export class DashviewComponent implements OnInit {
  postData = [{}];
  id: any;
  myUrl: any;
  deleteStatus = false;
  constructor(private dashService: DashboardService) {}

  ngOnInit() {
    this.getAllPosts();
  }
  getAllPosts() {
    this.dashService.getPosts().subscribe((res) => {
      this.postData = res;
    });
  }

  onDelete(id) {
    if (confirm("Are you sure you want to delete?") == true) {
      this.dashService.deletePost(id).subscribe(
        (res) => (this.deleteStatus = true),
        (err) => console.log(err)
      );
    }
  }
}
