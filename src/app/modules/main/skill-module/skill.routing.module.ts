import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SkillsComponent } from "./page/skills/skills.component";
//pages

const routes: Routes = [
  {
    path: "",
    component: SkillsComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillRoutingModule {}
