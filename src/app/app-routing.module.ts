import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./modules/main/home-module/home.module").then(
            (m) => m.HomeModule
          ),
      },
      {
        path: "skills",
        loadChildren: () =>
          import("./modules/main/skill-module/skill.module").then(
            (m) => m.SkillModule
          ),
      },
      {
        path: "portfolio",
        loadChildren: () =>
          import("./modules/main/portfolio-module/portfolio.module").then(
            (m) => m.PortfolioModule
          ),
      },
      {
        path: "about",
        loadChildren: () =>
          import("./modules/main/about-module/about.module").then(
            (m) => m.AboutModule
          ),
      },
      {
        path: "contact",
        loadChildren: () =>
          import("./modules/main/contact-module/contact.module").then(
            (m) => m.ContactModule
          ),
      },
    ],
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./modules/admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "**",
    pathMatch: "full",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
