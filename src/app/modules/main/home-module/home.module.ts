import { NgModule } from "@angular/core";
import { HomeComponent } from "./page/home/home.component";
import { ImgViewComponent } from "./component/img-view/img-view.component";
import { HomeRoutingModule } from "./home.routing.module";

@NgModule({
  declarations: [HomeComponent, ImgViewComponent],
  imports: [HomeRoutingModule],
})
export class HomeModule {}
