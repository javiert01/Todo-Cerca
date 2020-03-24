import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HOST } from "../shared/var.constants";
import { Commerce } from "../models/commerce.model";

@Injectable({
  providedIn: "root"
})
export class CommerceService {
  url = `${HOST}/commerces`;
  public commerce: Commerce;

  constructor(private http: HttpClient) {
    this.loadFakeData();
  }

  createNewCommerce(newCommerce) {
    return this.http.post<any>(`${this.url}/create`, newCommerce);
  }

  loadFakeData() {
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
  }

  getCommerce() {
    return this.commerce;
  }
  setCommerce(com: Commerce) {
    this.commerce = com;
  }
}
