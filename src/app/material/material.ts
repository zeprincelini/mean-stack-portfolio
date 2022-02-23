import { NgModule } from "@angular/core";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";

const material = [
  MatIconModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
