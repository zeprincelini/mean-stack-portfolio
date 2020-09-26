import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ImgViewComponent } from './img-view/img-view.component';
import { SkillsComponent } from './skills/skills.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import {DropdownDirective} from '../directives/dropdown';
import {HoverDirective} from '../directives/hover';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashviewComponent } from './dashview/dashview.component';
import { AddComponent } from './add/add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { DashboardService } from './dashboard.service';
import { SafePipe } from './safe.pipe';
import { EditComponent } from './edit/edit.component';
import { Base64 } from './base64.pipe';
import { ShortenPipe } from './shorten.pipe';
import { FileAccessorDirectiveDirective } from './file-accessor-directive.directive';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, data: {showRootComponents: true}},
  {path: 'skills', component: SkillsComponent, data: {showRootComponents: true}},
  {path: 'portfolio', component: PortfolioComponent, data: {showRootComponents: true}},
  {path: 'about', component: AboutComponent, data: {showRootComponents: true}},
  {path: 'contact', component: ContactComponent, data: {showRootComponents: true}},
  {path: 'login', component: LoginComponent, data: {showRootComponents: false}},
  {path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard], data: {showRootComponents: false}, children:[
    {path: 'dashview', component: DashviewComponent},
    {path: 'add', component: AddComponent},
  ]},
  {path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard]}
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
    DropdownDirective,
    HoverDirective,
    LoginComponent,
    DashboardComponent,
    DashviewComponent,
    AddComponent,
    SafePipe,
    Base64,
   ShortenPipe,
    EditComponent,
    FileAccessorDirectiveDirective
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatIconModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, AuthGuard, DashboardService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
