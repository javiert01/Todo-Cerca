import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../shared/var.constants";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  url = `${HOST}/categories`;
  constructor(private http: HttpClient) {}

  getCategoryList() {
    return this.http.get(`${this.url}/list`);
  }
}
