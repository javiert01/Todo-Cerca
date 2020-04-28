import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../shared/var.constants";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  url = `${HOST}/categories`;
  constructor(private http: HttpClient) {}

  getCategoryList() {
    return this.http.get(`${this.url}/list`);
  }
  // THIS METHOD IS USED IN ADMIN
  // FOR GET TOTAL OF EACH CATEGORY
  // DEPENDS OF CITYPARAM AND SHOW COMMERCE
  getCategotyListDynamic(allow, cityParam) {
    // {{url}}/categories/list/dinamic?allow=true&cityParam=Quito
    return this.http.get(
      `${this.url}/list/dinamic?allow=${allow}&cityParam=${cityParam}`
    );
  }
}
