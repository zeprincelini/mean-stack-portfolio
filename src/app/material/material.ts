import { NgModule } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";

const material = [
  MatIconModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
