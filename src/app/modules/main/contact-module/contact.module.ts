import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ContactRoutingModule } from "./contact.routing.module";
import { ContactComponent } from "./page/contact/contact.component";

@NgModule({
  declarations: [ContactComponent],
  imports: [ContactRoutingModule, SharedModule],
})
export class ContactModule {}
