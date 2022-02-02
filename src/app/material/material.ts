import { NgModule } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";

const material = [MatIconModule, MatTabsModule];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
