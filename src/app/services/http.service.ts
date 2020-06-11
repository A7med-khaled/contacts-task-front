import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private headers;
  constructor(private httpClient: HttpClient) {}

  public login(data) {
    return this.httpClient.post('http://localhost:3000/api/user/login', data);
  }

  public getcontacts(pageNo, limitNo,searchTxt) {
    return this.httpClient.get(`http://localhost:3000/api/contact/get?pageNo=${pageNo}&limitNo=${limitNo}&searchTxt=${searchTxt}`);
  }

  public deleteContact(id) {
    return this.httpClient.delete(`http://localhost:3000/api/contact/delete/${id}`);
  }

  public addContact(data) {
    return this.httpClient.post(`http://localhost:3000/api/contact/create`,data);
  }

  public editContact(data,id) {
    return this.httpClient.put(`http://localhost:3000/api/contact/edit/${id}`,data);
  }


}
