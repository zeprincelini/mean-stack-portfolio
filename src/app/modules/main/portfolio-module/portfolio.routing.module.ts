import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PortfolioComponent } from "./page/portfolio/portfolio.component";
//pages

const routes: Routes = [
  {
    path: "",
    component: PortfolioComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortfolioRoutingModule {}
