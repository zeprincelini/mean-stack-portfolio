import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
//pages
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { DashviewComponent } from "./pages/dashview/dashview.component";
import { AddComponent } from "./pages/add/add.component";
import { EditComponent } from "./pages/edit/edit.component";
//services
import { AuthGuard } from "src/app/shared/services/auth-guard/auth.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "dashview", component: DashviewComponent },
      { path: "add", component: AddComponent },
    ],
  },
  { path: "edit/:id", component: EditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
