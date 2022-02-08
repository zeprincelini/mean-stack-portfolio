import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { DashviewComponent } from "./pages/dashview/dashview.component";
import { AddComponent } from "./pages/add/add.component";
import { EditComponent } from "./pages/edit/edit.component";
import { AdminRoutingModule } from "./admin.routing.module";
import { MaterialModule } from "src/app/material/material";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    DashviewComponent,
    AddComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class AdminModule {}
