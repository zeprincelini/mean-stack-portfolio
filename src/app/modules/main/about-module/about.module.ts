import { NgModule } from "@angular/core";
import { AboutRoutingModule } from "./about.routing.module";
import { AboutComponent } from "./page/about/about.component";

@NgModule({
  declarations: [AboutComponent],
  imports: [AboutRoutingModule],
})
export class AboutModule {}
