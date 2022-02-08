import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DashboardService } from "src/app/shared/services/dashboard-service/dashboard.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
})
export class EditComponent implements OnInit {
  editSuccess = false;
  values = [
    "Web Development",
    "Graphic Design",
    "Ui/Ux Design",
    "Android Design",
  ];
  updateForm: FormGroup;
  currentUrl;
  data: any = {
    title: "",
    url: "",
    name: "",
  };

  constructor(
    private activeRoute: ActivatedRoute,
    private dashService: DashboardService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.updateForm = this.fb.group({
      title: [""],
      url: [""],
      img: [null],
      type: [""],
    });
  }

  ngOnInit() {
    this.currentUrl = this.activeRoute.snapshot.params;
    console.log(this.currentUrl);
    this.dashService.getPostById(this.currentUrl.id).subscribe((res) => {
      setTimeout(() => {
        this.data = res;
      }, 2000);
    });
  }
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.updateForm.patchValue({
      img: file,
    });
    this.updateForm.get("img").updateValueAndValidity();
  }
  postUpdate() {
    let formData: any = new FormData();
    formData.append("title", this.updateForm.get("title").value);
    formData.append("url", this.updateForm.get("url").value);
    formData.append("img", this.updateForm.get("img").value);
    formData.append("type", this.updateForm.get("type").value);

    this.currentUrl = this.activeRoute.snapshot.params;
    this.dashService.updatePost(this.currentUrl.id, formData).subscribe(
      (res) => (this.editSuccess = true),
      (err) => console.log(err)
    );
  }
  goBack() {
    this.location.back();
  }
}
