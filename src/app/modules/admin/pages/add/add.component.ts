import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { DashboardService } from "src/app/shared/services/dashboard-service/dashboard.service";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"],
})
export class AddComponent implements OnInit {
  postSuccess = false;
  postFail = false;
  uploadForm: FormGroup;
  data = {};
  values = [
    "Web Development",
    "Graphic Design",
    "Ui/Ux Design",
    "Android Design",
  ];
  editMode = false;
  obID: any;
  constructor(private dashService: DashboardService, public fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      title: [""],
      url: [""],
      img: [null],
      type: ["Web Development"],
    });
  }

  ngOnInit() {}

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({
      img: file,
    });
    this.uploadForm.get("img").updateValueAndValidity();
  }

  postBody() {
    let formData: any = new FormData();
    formData.append("title", this.uploadForm.get("title").value);
    formData.append("url", this.uploadForm.get("url").value);
    formData.append("img", this.uploadForm.get("img").value);
    formData.append("type", this.uploadForm.get("type").value);

    this.dashService.postDash(formData).subscribe(
      (res) => {
        this.postSuccess = true;
        console.log(res);
      },
      (err) => {
        this.postFail = true;
        console.log(err);
      }
    );
  }
}
