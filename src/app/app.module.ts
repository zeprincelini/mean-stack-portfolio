import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {HttpClientModule} from '@angular/common/http';

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
import { DashhomeComponent } from './dashhome/dashhome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, data: {showRootComponents: true}},
  {path: 'skills', component: SkillsComponent, data: {showRootComponents: true}},
  {path: 'portfolio', component: PortfolioComponent, data: {showRootComponents: true}},
  {path: 'about', component: AboutComponent, data: {showRootComponents: true}},
  {path: 'contact', component: ContactComponent, data: {showRootComponents: true}},
  {path: 'login', component: LoginComponent, data: {showRootComponents: false}},
  {path: 'dashboard', component: DashboardComponent, data: {showRootComponents: false}, children:[
    {path: 'dashhome', component: DashhomeComponent},
    {path: 'dashview', component: DashviewComponent},
    {path: 'add', component: AddComponent}
  ]},
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
    DashhomeComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
