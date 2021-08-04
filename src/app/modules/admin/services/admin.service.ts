import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private accessToken: string = "";
  private urlBase: string = "https://waffle-inc-api.azurewebsites.net";
  // private urlBase: string = "https://localhost:44376";

  constructor(private httpClient: HttpClient) {
    this.accessToken = sessionStorage.getItem('accessToken');
  }

  obterFuncionarios() {
    return this.doGetRequest(`funcionarios`);
  }

  cadastrarFuncionario(funcionario: any) {
    return this.doPostRequest(`funcionarios`, funcionario);
  }

  atualizarFuncionario(funcionario: any) {
    return this.doPutRequest(`funcionarios`, funcionario);
  }

  deletarFuncionario(funcionario: any){
    return this.doDeleteRequest(`funcionarios/${funcionario.id}`);
  }

  doGetRequest(path: string) : Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${path}`, this.getHttpOptions());
  }

  doPostRequest(path: string, body: any) : Observable<any> {
    return this.httpClient.post(`${this.urlBase}/${path}`, body, this.getHttpOptions());
  }

  doPutRequest(path: string, body: any) : Observable<any> {
    return this.httpClient.put(`${this.urlBase}/${path}`, body, this.getHttpOptions())
  }

  doDeleteRequest(path: string) : Observable<any> {
    return this.httpClient.delete(`${this.urlBase}/${path}`, this.getHttpOptions())
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
