import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { PortfolioComponent } from "./page/portfolio/portfolio.component";
import { PortfolioRoutingModule } from "./portfolio.routing.module";
import { MaterialModule } from "src/app/material/material";

@NgModule({
  declarations: [PortfolioComponent],
  imports: [PortfolioRoutingModule, SharedModule, MaterialModule],
})
export class PortfolioModule {}
