import { Component, OnInit, OnDestroy } from "@angular/core";
import { Commerce } from "src/app/models/commerce.model";
import { CommerceService } from "../../services/commerce.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-verify-register-data",
  templateUrl: "./verify-register-data.component.html",
  styleUrls: ["./verify-register-data.component.css"],
})
export class VerifyRegisterDataComponent implements OnInit, OnDestroy {
  comerceVerify: Commerce;
  lat = -0.1840506;
  lng = -78.503374;
  isLoading = false;
  // =========================================
  // Close subs
  // =========================================
  commerceServiceSub: Subscription;

  constructor(private commerceService: CommerceService, public router: Router) {
    this.comerceVerify = commerceService.getCommerce();
    this.lat = this.comerceVerify.location.coordinates[1];
    this.lng = this.comerceVerify.location.coordinates[0];
  }

  ngOnInit(): void {}

  postComerce() {
    this.isLoading = true;
    this.commerceServiceSub = this.commerceService
      .createNewCommerce(this.comerceVerify)
      .subscribe(
        (data) => {
          this.commerceService.setCommerceFormData(null);
          this.isLoading = false;
          this.changeThanksPage();
        },
        (err) => {
          console.error(err);
        }
      );
  }
  changeThanksPage() {
    this.router.navigate(["/gracias"]);
  }
  changeRegisterPage() {
    this.router.navigate(["/registrar"], {
      queryParams: { formulario: "true" },
    });
  }
  ngOnDestroy() {
    if (this.commerceServiceSub) {
      this.commerceServiceSub.unsubscribe();
    }
  }
}
