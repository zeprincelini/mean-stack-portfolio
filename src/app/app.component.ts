import { AfterViewInit, Component, Renderer2 } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  title = "myportfolio";
  root: Boolean;
  public constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement("#lazy");
    this.renderer.setStyle(loader, "display", "none");
  }
}
