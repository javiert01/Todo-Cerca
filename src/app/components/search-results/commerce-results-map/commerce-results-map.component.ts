import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { PlaceService } from "src/app/services/place.service";
import { CommerceService } from "src/app/services/commerce.service";

@Component({
  selector: "app-commerce-results-map",
  templateUrl: "./commerce-results-map.component.html",
  styleUrls: ["./commerce-results-map.component.css"],
})
export class CommerceResultsMapComponent implements OnInit {
  initialCoordinates;
  commerceCoordinates = [];
  @ViewChild("gm", { static: true }) gm;

  constructor(
    private placeService: PlaceService,
    private commerceService: CommerceService
  ) {}

  ngOnInit(): void {
    this.initialCoordinates = this.placeService.getSelectedCoordinates();
    console.log(this.initialCoordinates);
    this.commerceService.commerceResultListChanged.subscribe((data) => {
      this.gm.lastOpen = null;
      this.commerceCoordinates = data;
    });
    this.commerceCoordinates = this.commerceService.getCommerceResultList();
    console.log(this.commerceCoordinates);
  }

  onMouseOver(infoWindow, gm) {
    console.log("mouse over");
    if (gm.lastOpen != null) {
      console.log(gm.lastOpen);
      gm.lastOpen.close();
    }

    gm.lastOpen = infoWindow;

    infoWindow.open();
  }

  onMouseLeave(infoWindow, gm) {
    //gm.lastOpen = null;
  }
}
