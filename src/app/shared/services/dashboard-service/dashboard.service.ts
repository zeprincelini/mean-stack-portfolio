import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private dashPostUrl = `${environment.BASE_URL}/dashboard/add`;
  private getPostUrl = `${environment.BASE_URL}/dashboard`;
  private getPostDashboard = `${environment.BASE_URL}/dashview`;

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
