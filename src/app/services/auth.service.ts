import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
// import { HOST } from "../shared/var.constants";
import { JwtHelperService } from "@auth0/angular-jwt";
import { DinamicUrlService } from "./dinamic-url.service";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url;

  helper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private _router: Router,
    private _dinamicUrl: DinamicUrlService
  ) {
    this.getUrlDinamic();
  }

  getUrlDinamic() {
    this._dinamicUrl.urlSubject
      .pipe(
        tap((url) => {
          console.log("A donde debería autenticarse: ", url);
          this.url = `${url}/user`;
        })
      )
      .subscribe();
  }

  usuarioLogin(loginData) {
    console.log("la URL DONDE SE QUIERE POSTEAR: ", `${this.url}/login`);
    // loginData.role = "Administrador";
    console.log("la INFO QUE SE QUIERE POSTEAR: ", loginData);
    return this.http.post<any>(`${this.url}/login`, loginData);
  }

  logoutUser(rol) {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("username");
    // console.log("entro!!");

    switch (rol) {
      case "Administrador":
        this._router.navigate(["/login-admin"]);
        break;
      case "ATC":
        this._router.navigate(["/login-admin"]);
        break;
      default:
        this._router.navigate(["/login-admin"]);
        break;
    }
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isTokenExpired() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      if (this.helper.isTokenExpired(token)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
