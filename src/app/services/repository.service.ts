import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  private accessToken: string = "";
  private urlBase: string = "https://waffle-inc-api.azurewebsites.net";
  // private urlBase: string = "https://localhost:44376";

  constructor(private httpClient: HttpClient) { }

  login(email: string, senha: string) {
    return this.doPostRequest('login', {email, senha});
  }

  doPostRequest(path: string, body: any) : Observable<any> {
    return this.httpClient.post(`${this.urlBase}/${path}`, body, this.getHttpOptions());
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  isAuthenticated() {
    return this.accessToken !== "";
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`})
    };
  }
}
