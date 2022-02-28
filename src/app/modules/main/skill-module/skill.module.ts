import { NgModule } from "@angular/core";
import { SkillsComponent } from "./page/skills/skills.component";
import { SkillRoutingModule } from "./skill.routing.module";
import { MaterialModule } from "src/app/material/material";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [SkillsComponent],
  imports: [SkillRoutingModule, MaterialModule, CommonModule],
})
export class SkillModule {}
