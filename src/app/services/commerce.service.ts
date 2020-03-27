import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../shared/var.constants";
import { Commerce } from "../models/commerce.model";

@Injectable({
  providedIn: "root"
})
export class CommerceService {
  url = `${HOST}/commerces`;
  public commerce: Commerce;
  public commerceFormData = null;

  constructor(private http: HttpClient) {
  }

  createNewCommerce(newCommerce) {
    return this.http.post<any>(`${this.url}/create`, newCommerce);
  }

  getAllCommerces() {
    return this.http.get<any>(`${this.url}/all`); 
  }

  getCommerce() {
    return this.commerce;
  }
  setCommerce(com: Commerce) {
    this.commerce = com;
  }

  getCommerceFormData() {
    return this.commerceFormData;
  }

  setCommerceFormData(formData) {
    this.commerceFormData = formData;
  }
}
