import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/shared/services/dashboard-service/dashboard.service";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.css"],
})
export class PortfolioComponent implements OnInit {
  data = [{}];
  loading = true;
  constructor(private dashService: DashboardService) {}

  ngOnInit() {
    this.dashService.getPosts().subscribe(
      (res) => {
        this.loading = false;
        this.data = res;
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  }
}
