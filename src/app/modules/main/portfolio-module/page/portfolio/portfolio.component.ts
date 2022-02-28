import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/shared/services/dashboard-service/dashboard.service";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.css"],
})
export class PortfolioComponent implements OnInit {
  data = [{}];
  loading = false;
  error = false;
  filterState = false;
  type = "Web Development";

  constructor(private dashService: DashboardService) {}

  ngOnInit() {
    this.getAllPosts(this.type);
    // this.dashService.getPosts().subscribe(
    //   (res) => (this.data = res),
    //   (err) => console.log(err)
    // );
  }

  getAllPosts = (val: string) => {
    this.loading = true;
    this.error = false;
    this.dashService.getPosts(val).subscribe(
      (res) => {
        this.filterState = true;
        this.loading = false;
        this.error = false;
        this.data = res;
      },
      (err) => {
        this.loading = false;
        this.error = true;
      }
    );
  };
}
