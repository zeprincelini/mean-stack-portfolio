import { Component, OnInit } from "@angular/core";
import { Router, Event, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.css"],
})
export class MainLayoutComponent implements OnInit {
  path: string;
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.path = event.url;
      }
    });
  }

  ngOnInit() {}
}
