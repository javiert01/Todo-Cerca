import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommerceService } from "src/app/services/commerce.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // ==========================================================================
  // subscriptions
  // ==========================================================================
  commmerceServiceSub: Subscription;
  totalCommerces = 0;

  constructor(private commmerceService: CommerceService) {}

  ngOnInit(): void {
    this.commmerceServiceSub = this.commmerceService
      .getTotalRegisteredCommerces()
      .subscribe((data) => {
        this.totalCommerces = data["allowedCommerces"];
      });
  }
  ngOnDestroy(): void {
    if (this.commmerceServiceSub) {
      this.commmerceServiceSub.unsubscribe();
    }
  }
}
