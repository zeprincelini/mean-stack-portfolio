import { ThrowStmt } from "@angular/compiler";
import { Component, Renderer2 } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "myportfolio";
  root: Boolean;
  public constructor(private renderer: Renderer2) {}
  ngAfterViewInit() {
    let preLoader = this.renderer.selectRootElement(".pre-loader");
    this.renderer.setStyle(preLoader, "display", "none");
  }
}
