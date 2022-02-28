import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, NgForm } from "@angular/forms";
import { ContactService } from "src/app/shared/services/contact-service/contact.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  @ViewChild("contact") contact: NgForm;
  user: any = {
    email: "",
    job: "",
    name: "",
  };
  contactForm: FormGroup;
  mailSuccess = false;
  mailError = false;
  loading = false;

  constructor(private contactService: ContactService) {}

  ngOnInit() {}
  submit() {
    this.loading = true;
    this.contactService.mail(this.user).subscribe(
      (res) => {
        this.mailSuccess = true;
        this.loading = false;
      },
      (err) => {
        this.mailError = true;
        this.loading = false;
      }
    );
    this.contact.reset();
  }
}
