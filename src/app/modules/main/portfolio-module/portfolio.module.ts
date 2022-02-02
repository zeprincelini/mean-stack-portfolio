import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { PortfolioComponent } from "./page/portfolio/portfolio.component";
import { PortfolioRoutingModule } from "./portfolio.routing.module";

@NgModule({
  declarations: [PortfolioComponent],
  imports: [PortfolioRoutingModule, SharedModule],
})
export class PortfolioModule {}
