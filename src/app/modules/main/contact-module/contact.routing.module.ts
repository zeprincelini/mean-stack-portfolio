import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactComponent } from "./page/contact/contact.component";
//pages

const routes: Routes = [
  {
    path: "",
    component: ContactComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactRoutingModule {}
