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

  constructor(commerceService: CommerceService, public router: Router) {
    this.comerceVerify = commerceService.getCommerce();
    console.log("Comerce verify: ", commerceService.getCommerce());
  }

  ngOnInit(): void {}


  getScheduleAttetion() {
    return `Hora de apertura : ${this.comerceVerify.hourOpen}, hora de cierre ${this.comerceVerify.hourClose}`;
  }
  postComerce() {
    this.changeThanksPage();
  }
  changeThanksPage() {
    this.router.navigate(["/gracias"]);
  }
  changeRegisterPage() {
    this.router.navigate(["/registrar"]);
  }

}
