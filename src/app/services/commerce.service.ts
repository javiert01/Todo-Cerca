import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HOST } from "../shared/var.constants";
import { Commerce } from "../models/commerce.model";

@Injectable({
  providedIn: "root",
})
export class CommerceService {
  url = `${HOST}/commerces`;
  urlBlueprint = `${HOST}/commerce`;
  public commerce: Commerce;
  public commerceFormData = null;
  httpOptions;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    };
  }

  createNewCommerce(newCommerce) {
    return this.http.post<any>(`${this.url}/create`, newCommerce);
  }

  deleteCommerce(commerceID) {
    /*return this.http.delete<any>(
      `${this.urlBlueprint}/?id=${commerceID}`,
      this.httpOptions
    );*/
    return this.http.post<any>(`${this.url}/delete`,{id:commerceID});
  }

  updateStatusCommerce(commerceID) {
    const data = {
      id: commerceID,
    };
    return this.http.patch<any>(
      `${this.urlBlueprint}/update`,
      data,
      this.httpOptions
    );
  }

  getAllCommerces(allowed, pageNumber, category) {
    return this.http.get<any>(
      `${this.url}/all?allowed=${allowed}&pageNumber=${pageNumber}&category=${category}`,
      this.httpOptions
    );
  }

  getCommerceByID(idCommerce) {
    // return this.http.get<any>(`${this.urlBlueprint}/?id=${idCommerce}`);
    return this.http.get<any>(`${this.url}/one?id=${idCommerce}`);
  }

  updateCommerce(data) {
    return this.http.post<any>(`${this.url}/edit`, data);
  }

  getAllCommercesNoPagination(allow) {
    return this.http.get<any>(
      `${this.url}/all/nopagination?allowed=${allow}`,
      this.httpOptions
    );
  }

  searchCommerce(param, pageSize, pageNumber, allowed) {
    return this.http.get<any>(
      `${this.url}/patterMatch?param=${param}&pageSize=${pageSize}&pageNumber=${pageNumber}&allowed=${allowed}`
    );
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

  getCommercesRegistedData() {
    return this.http.get<any>(`${this.url}/total`);
  }
}
