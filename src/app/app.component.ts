import { Component } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, map, mergeMap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "myportfolio";
  root: Boolean;
  public constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    //   this.router.events.pipe(
    //     filter(event => event instanceof NavigationEnd),
    //     map(() => this.route),
    //     map(route => {
    //       while (route.firstChild) route = route.firstChild
    //       return route
    //     }),
    //     filter(route => route.outlet === 'primary'),
    //     mergeMap(route => route.data)
    //   ).subscribe(data =>
    //       this.root = data.showRootComponents
    //     )
  }
}
