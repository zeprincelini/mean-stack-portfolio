import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  //dev
  // private dashboardUrl = "http://localhost:3000/api/dashboard";
  // private dashPostUrl = "http://localhost:3000/api/dashboard/add";
  // private getPostUrl = "http://localhost:3000/api/dashboard/dashview";

  //prod
  private dashPostUrl =
    "https://shielded-ocean-66356.herokuapp.com/api/dashboard/add";
  private getPostUrl =
    "https://shielded-ocean-66356.herokuapp.com/api/dashboard";
  private getPostDashboard =
    "https://shielded-ocean-66356.herokuapp.com/api/dashview";
  startedEdit = new Subject<any>();

  constructor(private http: HttpClient) {}

  postDash(body) {
    return this.http.post<any>(this.dashPostUrl, body);
  }
  getPosts(type = "") {
    return this.http.get<any>(this.getPostUrl, { params: { type } });
  }
  getPostsDashboard(page, limit) {
    return this.http.get<any>(this.getPostDashboard, {
      params: { page, limit },
    });
  }
  getPostById(id) {
    return this.http.get<any>(this.getPostUrl + "/" + id);
  }
  updatePost(id, body) {
    return this.http.put<any>(this.getPostUrl + "/" + id, body);
  }
  deletePost(id) {
    return this.http.delete<any>(this.getPostUrl + "/" + id);
  }
}
