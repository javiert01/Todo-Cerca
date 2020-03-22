import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from '../shared/var.constants';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {
  url = `${HOST}/commerces`;

  constructor(private http: HttpClient) {}

  createNewCommerce(newCommerce) {
    return this.http.post<any>(`${this.url}/create`, newCommerce);
  }

}
