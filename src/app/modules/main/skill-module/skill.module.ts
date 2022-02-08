import { NgModule } from "@angular/core";
import { SkillsComponent } from "./page/skills/skills.component";
import { SkillRoutingModule } from "./skill.routing.module";

@NgModule({
  declarations: [SkillsComponent],
  imports: [SkillRoutingModule],
})
export class SkillModule {}
