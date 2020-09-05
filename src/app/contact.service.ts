import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private emailUrl = "http://localhost:3000/api/contact/send";
  constructor(private http: HttpClient) { }
  mail(body){
    return this.http.post<any>(this.emailUrl, body, {responseType: 'text' as 'json'});
  }
}
