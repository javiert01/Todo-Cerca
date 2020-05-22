import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DinamicUrlService } from "./dinamic-url.service";
import { tap } from "rxjs/operators";
// import { HOST } from "../shared/var.constants";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  url = `${this._dinamicUrl.url_backend_fija}/categories`;

  constructor(
    private http: HttpClient,
    private _dinamicUrl: DinamicUrlService
  ) {}

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
