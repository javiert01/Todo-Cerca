import { Component, OnInit } from "@angular/core";
import { CommerceService } from "src/app/services/commerce.service";

@Component({
  selector: "app-commerce-list",
  templateUrl: "./commerce-list.component.html",
  styleUrls: ["./commerce-list.component.css"],
})
export class CommerceListComponent implements OnInit {
  commerces = [];
  totalCommerces = 0;

  constructor(private commerceService: CommerceService) {}

  ngOnInit(): void {
    this.commerceService.commerceResultListChanged.subscribe((data) => {
      this.commerces = data;
    });
    this.commerceService.totalCommercesChanged.subscribe((data) => {
      this.totalCommerces = data;
    })
    this.commerces = this.commerceService.getCommerceResultList();
    this.totalCommerces = this.commerceService.getTotalCommerces();
  }
}
