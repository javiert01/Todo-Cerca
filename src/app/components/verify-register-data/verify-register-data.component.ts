import { Component, OnInit } from "@angular/core";
import { Commerce } from "src/app/models/commerce.model";
import { CommerceService } from "../../services/commerce.service";

@Component({
  selector: "app-verify-register-data",
  templateUrl: "./verify-register-data.component.html",
  styleUrls: ["./verify-register-data.component.css"]
})
export class VerifyRegisterDataComponent implements OnInit {
  comerceVerify: Commerce;

  constructor(commerceService: CommerceService) {
    this.comerceVerify = commerceService.getCommerce();
    console.log("Comerce verify: ", commerceService.getCommerce());
  }

  ngOnInit(): void {}

}
