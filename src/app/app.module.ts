import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthGuard } from "./shared/services/auth-guard/auth.guard";
import { TokenInterceptorService } from "./shared/services/intercept/token-interceptor.service";
import { AuthService } from "./shared/services/auth-service/auth.service";
import { DashboardService } from "./shared/services/dashboard-service/dashboard.service";
import { SharedModule } from "./shared/shared.module";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { MaterialModule } from "./material/material";
import { FileAccessorDirectiveDirective } from "./file-accessor-directive.directive";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainLayoutComponent,
    FooterComponent,
    FileAccessorDirectiveDirective,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
