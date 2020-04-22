import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { PlaceService } from "src/app/services/place.service";
import { CommerceService } from "src/app/services/commerce.service";
import { CategoryService } from "src/app/services/category.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-commerce-results-map",
  templateUrl: "./commerce-results-map.component.html",
  styleUrls: ["./commerce-results-map.component.css"],
})
export class CommerceResultsMapComponent implements OnInit, OnDestroy {
  initialCoordinates;
  commerceCoordinates = [];
  categories = [];
  @ViewChild("gm", { static: true }) gm;
  myStyles = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ];

  // =========================================
  // Close subs
  // =========================================
  commerceServiceSub: Subscription;
  placeServiceSub: Subscription;

  constructor(
    private placeService: PlaceService,
    private commerceService: CommerceService
  ) {}

  ngOnInit(): void {
    this.commerceServiceSub = this.commerceService.totalCommercesResultListChanged.subscribe(
      (data) => {
        this.gm.lastOpen = null;
        this.commerceCoordinates = data;
      }
    );
    this.placeServiceSub = this.placeService.selectedCoordinatesChanged.subscribe(
      (data) => {
        this.initialCoordinates = data;
      }
    );
    this.initialCoordinates = this.placeService.getSelectedCoordinates();
    this.commerceCoordinates = this.commerceService.getTotalCommerceResultList();
  }

  onMouseOver(infoWindow, gm) {
    if (gm.lastOpen != null) {
      gm.lastOpen.close();
    }

    gm.lastOpen = infoWindow;

    infoWindow.open();
  }

  onMouseLeave(infoWindow, gm) {
    //gm.lastOpen = null;
  }

  getWhatsappURL(phone) {
    phone = phone.slice(1, phone.length);
    phone = "593" + phone;
    if (window.innerWidth < 551) {
      return `http://api.whatsapp.com/send?phone=${phone}&text=Buenos%20días,%20encontré%20tu%20negocio%20en%20todosmascerca.com%20y%20quisiera%20hacerte%20un%20pedido.`;
    }
    return `http://web.whatsapp.com/send?phone=${phone}&text=Buenos%20días,%20encontré%20tu%20negocio%20en%20todosmascerca.com%20y%20quisiera%20hacerte%20un%20pedido.`;
  }
  ngOnDestroy() {
    if (this.commerceServiceSub) {
      this.commerceServiceSub.unsubscribe();
    }
    if (this.placeServiceSub) {
      this.placeServiceSub.unsubscribe();
    }
  }
}
