import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //dev
  // private emailUrl = "http://localhost:3000/api/contact/send";

  //prod
  private emailUrl = "https://shielded-ocean-66356.herokuapp.com/api/contact/send";

  constructor(private http: HttpClient) { }
  mail(body){
    return this.http.post<any>(this.emailUrl, body, {responseType: 'text' as 'json'});
  }
}
