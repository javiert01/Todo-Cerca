import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HOST } from '../shared/var.constants';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = `${HOST}/user`;
  helper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private _router: Router
  ) {}


  usuarioLogin(loginData) {
    return this.http.post<any>(this.url + "/login", loginData);
  }


  logoutUser(rol) {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("username");

    switch (rol) {
      case "Admin":
        this._router.navigate(["/login-admin"]);
        break;
      default:
        this._router.navigate(["/registrar"]);
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
    }
  }
}