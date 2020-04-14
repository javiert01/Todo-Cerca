import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../shared/var.constants";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  url = `${HOST}/categories`;
  urlCommerce = `${HOST}/commerces`;
  constructor(private http: HttpClient) {}

  getCategoryList() {
    return this.http.get(`${this.url}/list`);
  }

  getInformationCategoryTable(lng, lat) {
    // {{url}}/commerces/numberperategory?longitud=-78.4865042&latitud=-0.2045284
    return this.http.get<any>(
      `${this.urlCommerce}/numberperategory?longitud=${lng}&latitud=${lat}`
    );
  }

}
