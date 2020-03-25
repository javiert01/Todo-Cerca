import { Component, OnInit } from "@angular/core";
import { Commerce } from "src/app/models/commerce.model";
import { CommerceService } from "../../services/commerce.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-verify-register-data",
  templateUrl: "./verify-register-data.component.html",
  styleUrls: ["./verify-register-data.component.css"]
})
export class VerifyRegisterDataComponent implements OnInit {
  comerceVerify: Commerce;
  lat = -0.1840506;
  lng = -78.503374;

  constructor(private commerceService: CommerceService, public router: Router) {
    this.comerceVerify = commerceService.getCommerce();
    this.lat = this.comerceVerify.location.coordinates[1];
    this.lng = this.comerceVerify.location.coordinates[0];
  }

  ngOnInit(): void {}

  postComerce() {
    this.changeThanksPage();
    this.commerceService.createNewCommerce(this.comerceVerify)
    .subscribe(
      (data) => {
        console.log('registro exitoso', data);
        this.commerceService.setCommerceFormData(null);
      },
      (err) => {
        console.error(err);
      }
    )
  }
  changeThanksPage() {
    this.router.navigate(["/gracias"]);
  }
  changeRegisterPage() {
    this.router.navigate(["/registrar"]);
  }

}
