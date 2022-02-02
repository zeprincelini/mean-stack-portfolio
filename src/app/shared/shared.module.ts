import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownDirective } from "./directives/dropdown";
import { HoverDirective } from "./directives/hover";
import { Base64 } from "./pipes/base64.pipe";
import { SafePipe } from "./pipes/safe.pipe";
import { ShortenPipe } from "./pipes/shorten.pipe";

@NgModule({
  declarations: [
    HoverDirective,
    DropdownDirective,
    SafePipe,
    Base64,
    ShortenPipe,
  ],
  exports: [
    CommonModule,
    HoverDirective,
    DropdownDirective,
    SafePipe,
    Base64,
    ShortenPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
