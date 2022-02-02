import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/shared/services/dashboard-service/dashboard.service";

@Component({
  selector: "app-portfolio",
  templateUrl: "./portfolio.component.html",
  styleUrls: ["./portfolio.component.css"],
})
export class PortfolioComponent implements OnInit {
  data = [{}];
  constructor(private dashService: DashboardService) {}

  ngOnInit() {
    this.dashService.getPosts().subscribe(
      (res) => (this.data = res),
      (err) => console.log(err)
    );
  }
}
