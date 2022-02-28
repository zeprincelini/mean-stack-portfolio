import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { DashboardService } from "src/app/shared/services/dashboard-service/dashboard.service";

@Component({
  selector: "app-dashview",
  templateUrl: "./dashview.component.html",
  styleUrls: ["./dashview.component.css"],
})
export class DashviewComponent implements OnInit {
  postData = new MatTableDataSource();
  deleteStatus: boolean = false;
  error: boolean = false;
  count: number;
  page: number = 1;
  limit: number = 5;
  limitOptions = [5, 10, 15, 20];
  tableColumns: string[] = ["date", "title", "thumbnail", "action"];
  // data = new MatTableDataSource([
  //   { date: "12/22", title: "powerful", thumbnail: "im here" },
  //   { date: "12/22", title: "powerful", thumbnail: "im here" },
  //   { date: "12/22", title: "powerful", thumbnail: "im here" },
  //   { date: "12/22", title: "powerful", thumbnail: "im here" },
  //   { date: "12/22", title: "powerful", thumbnail: "im here" },
  //   { date: "12/22", title: "powerful", thumbnail: "im here" },
  //   { date: "12/22", title: "powerful", thumbnail: "im here" },
  //   { date: "12/22", title: "powerful", thumbnail: "im here" },
  //   { date: "12/22", title: "powerful", thumbnail: "im here" },
  // ]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dashService: DashboardService) {}

  ngOnInit() {
    this.getAllPosts(this.page, this.limit);
    // this.dashService.getPosts().subscribe((res) => (this.postData = res));
  }

  ngAfterViewInit() {
    this.postData.paginator = this.paginator;
  }

  getAllPosts(page: number, limit: number) {
    this.dashService.getPostsDashboard(page, limit).subscribe(
      (res) => {
        this.postData = res.posts;
        this.count = res.totalCount;
        this.error = false;
      },
      (err) => (this.error = true)
    );
  }

  onDelete(id: string) {
    if (confirm("Are you sure you want to delete?") == true) {
      this.dashService.deletePost(id).subscribe(
        (res) => {
          this.deleteStatus = true;
          this.error = false;
        },
        (err) => (this.error = true)
      );
    }
  }
}
