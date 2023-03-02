import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class ContactService {
  private emailUrl = `${environment.BASE_URL}/contact/send`;

  constructor(private http: HttpClient) {}
  mail(body) {
    return this.http.post<any>(this.emailUrl, body, {
      responseType: "text" as "json",
    });
  }
}
