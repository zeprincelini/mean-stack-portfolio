import { NgModule } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatChipsModule } from "@angular/material";

const material = [
  MatIconModule,
  MatTabsModule,
  MatProgressBarModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
  MatChipsModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
