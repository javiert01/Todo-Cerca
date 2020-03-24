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

  ngOnInit(): void {}

  loadFakeData() {
    let ownerName = "Ximena";
    let ownerLastName = "Arguello";
    let phone = " 0987676543 ";
    let commerceName = " Viveres rosa";
    let commercePhoto = "";
    let hourOpen = "9:00";
    let hourClose = "21:00 ";
    let province = "";
    let city = "";
    let neighborhood = "";
    let address = "Eloy alfaro Oe 12-35 y Amazonas ";
    let location = "";
    let reference = " Diagonal al redondel ";
    let commerceDescription =
      " Somos una tienda de barrio, donde podrás encontrar todo tipo de alimentos y bebidas. ";
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
}
