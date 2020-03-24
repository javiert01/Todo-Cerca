import { Component, OnInit } from "@angular/core";
import { Commerce } from "src/app/models/commerce.model";

@Component({
  selector: "app-verify-register-data",
  templateUrl: "./verify-register-data.component.html",
  styleUrls: ["./verify-register-data.component.css"]
})
export class VerifyRegisterDataComponent implements OnInit {
  fakeCommerce: Commerce;

  constructor() {}

  ngOnInit(): void {
    this.loadFakeData();
  }

  loadFakeData() {
    let ownerName = "Camila";
    let ownerLastName = "Arguello";
    let phone = " 0987676543 ";
    let commerceName = " Viveres Koala";
    let commercePhoto =
      "https://trome.pe/resizer/lSrtu0xYQRpB4byIKl6qAhJU74U=/980x528/smart/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/VVJTTD7QU5H23MZTY6X66ULOY4.jpg";
    let hourOpen = "10:00";
    let hourClose = "23:00 ";
    let province = "";
    let city = "";
    let neighborhood = "";
    let address = "Eloy alfaro Oe 12-35 y Portugal ";
    let location = "";
    let reference = "Frente a la inglesia";
    let commerceDescription = "Somos Koala con eso te dijo todo!!";
    let category = "Abarrotes ";
    this.fakeCommerce = new Commerce(
      ownerName,
      ownerLastName,
      phone,
      commerceName,
      commercePhoto,
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

  getScheduleAttetion() {
    return `Hora de apertura : ${this.fakeCommerce.hourOpen}, hora de cierre ${this.fakeCommerce.hourClose}`;
  }
}
