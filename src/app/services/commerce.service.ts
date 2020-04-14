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

  constructor(private http: HttpClient) {}

  createNewCommerce(newCommerce) {
    return this.http.post<any>(`${this.url}/create`, newCommerce);
  }

  /*  loadFakeData() {
    let ownerName = "Camila";
    let ownerLastName = "Arguello";
    let phone = " 0987676543 ";
    let commerceName = " Viveres Koala";
    let commercePhoto =
      "https://trome.pe/resizer/lSrtu0xYQRpB4byIKl6qAhJU74U=/980x528/smart/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/VVJTTD7QU5H23MZTY6X66ULOY4.jpg";
    let frequency = "Lunes a Viernes";
    let hourOpen = "10:00";
    let hourClose = "23:00 ";
    let province = "";
    let city = "";
    let neighborhood = "";
    let address = "Eloy alfaro Oe 12-35 y Portugal ";
    let location = "";
    let reference = "Frente a la inglesia";
    let commerceDescription = "Somos Koala con eso te dijo todo!!";
    let category = "Abarrotes";

    this.commerce = new Commerce(
      ownerName,
      ownerLastName,
      phone,
      commerceName,
      commercePhoto,
      frequency,
      hourOpen,
      hourClose,
      province,
      city,
      neighborhood,
      address,
      location,
      reference,
      commerceDescription,
      category
    );
  } */

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
  deleteCommerce(id) {
    // {{url}}/commerces/delete
    return this.http.post<any>(`${this.url}/delete`, { id });
  }
  getNearestCommerces(lng, lat, category, pageNumber) {
    // {{url}}/commerces/near?longitud=-78.4865042&latitud=-0.2045284&category=Tienda&pageNumber=1
    return this.http.get<any>(
      `${this.url}/near?longitud=${lng}&latitud=${lat}&category=${category}&pageNumber=${pageNumber}`
    );
  }
}
