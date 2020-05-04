import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../shared/var.constants";
import { Commerce } from "../models/commerce.model";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class CommerceService {
  url = `${HOST}/commerces`;
  public commerce: Commerce;
  public commerceFormData = null;
  public commerceResultList = [];
  public commerceResultListChanged = new Subject<any[]>();
  public totalCommercesResultList = [];
  public totalCommercesResultListChanged = new Subject<any[]>();
  public totalCommerces = 0;
  public totalCommercesAllCategory = 0;
  public totalCommercesChanged = new Subject<any>();
  public totalCommercesChangedAllCategory = new Subject<any>();

  constructor(private http: HttpClient) {}

  createNewCommerce(newCommerce) {
    return this.http.post<any>(`${this.url}/create`, newCommerce);
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
  setCommerceResultList(list) {
    this.commerceResultList = [...list];
    this.commerceResultListChanged.next(this.commerceResultList.slice());
  }
  getCommerceResultList() {
    return this.commerceResultList;
  }
  setTotalCommerceResultList(list) {
    this.totalCommercesResultList = [...list];
    this.totalCommercesResultListChanged.next(this.totalCommercesResultList.slice());
  }
  getTotalCommerceResultList() {
    return this.commerceResultList;
  }

  setTotalCommerces(commerNum) {
    this.totalCommerces = commerNum;
    this.totalCommercesChanged.next(this.totalCommerces);
  }
  getTotalCommerces() {
    return this.totalCommerces;
  }

  setTotalCommercesAllCategories(num) {
    this.totalCommercesAllCategory = num;
    this.totalCommercesChangedAllCategory.next(this.totalCommercesAllCategory);
  }
  getTotalCommercesAllCategories() {
    return this.totalCommercesAllCategory;
  }

  getTotalRegisteredCommerces() {
    return this.http.get<any>(this.url + '/total');
  }
  deleteCommerce(id) {
    // {{url}}/commerces/delete
    return this.http.post<any>(`${this.url}/delete`, { id });
  }
  getNearestCommerces(lng, lat, category, pageNumber, pageSize) {
    // {{url}}/commerces/near?longitud=-78.4865042&latitud=-0.2045284&category=Tienda&pageNumber=1
    return this.http.get<any>(
      `${this.url}/near?longitud=${lng}&latitud=${lat}&category=${category}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getTotalNearestCommerces(lng, lat, category) {
    return this.http.get<any>(`${this.url}/near/notpagination?longitud=${lng}&latitud=${lat}&category=${category}`);
  }

  getAllCommercesByCity(city) {
    return this.http.get<any>(`${this.url}/city?city=${city}`);
  }
}
