import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { ImgViewComponent } from "./components/img-view/img-view.component";
import { SkillsComponent } from "./pages/skills/skills.component";
import { PortfolioComponent } from "./pages/portfolio/portfolio.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./pages/home/home.component";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthGuard } from "./shared/services/auth-guard/auth.guard";
import { TokenInterceptorService } from "./shared/services/intercept/token-interceptor.service";
import { AuthService } from "./shared/services/auth-service/auth.service";
import { DashboardService } from "./shared/services/dashboard-service/dashboard.service";
import { SharedModule } from "./shared/shared.module";
import { FileAccessorDirectiveDirective } from "./file-accessor-directive.directive";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, data: { showRootComponents: true } },
  {
    path: "skills",
    component: SkillsComponent,
    data: { showRootComponents: true },
  },
  {
    path: "portfolio",
    component: PortfolioComponent,
    data: { showRootComponents: true },
  },
  {
    path: "about",
    component: AboutComponent,
    data: { showRootComponents: true },
  },
  {
    path: "contact",
    component: ContactComponent,
    data: { showRootComponents: true },
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImgViewComponent,
    SkillsComponent,
    PortfolioComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    HomeComponent,
    FileAccessorDirectiveDirective,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    MatTabsModule,
    MatIconModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    DashboardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
