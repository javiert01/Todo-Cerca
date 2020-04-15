import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../shared/var.constants";
import { Subject } from 'rxjs';


@Injectable({
  providedIn: "root"
})
export class CategoryService {
  url = `${HOST}/categories`;
  url2 = `${HOST}/category`;
  categoryList = [];
  totalCategories = [];
  totalCategoriesChanged = new Subject<any>();
  constructor(private http: HttpClient) {
    this.setCategoryList();
  }

  getCategoryList() {
    return this.http.get(`${this.url}/list`);
  }

  setCategoryList() {
    this.http.get<any>(`${this.url}/list`).
    subscribe((data) => {
      this.categoryList = data;
    });
  }

  setTotalCategories(totalCat) {
    this.totalCategories = [...totalCat];
    this.totalCategoriesChanged.next(this.totalCategories);
  }
  getTotalCategories() {
    return this.totalCategories;
  }

  getInformationCategoryTable(lng, lat) {
    // {{url}}/commerces/numberperategory?longitud=-78.4865042&latitud=-0.2045284
    return this.http.get<any>(
      `${this.url2}/numberperategory?longitud=${lng}&latitud=${lat}`
    );
  }

}
