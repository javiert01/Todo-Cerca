import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommerceService } from "src/app/services/commerce.service";
import { PlaceService, LocalCoordinates } from "src/app/services/place.service";
import { CategoryService } from "src/app/services/category.service";
import { Subscription } from "rxjs";
import { AnalyticsService } from 'src/app/services/Analytics/analytics.service';

@Component({
  selector: "app-commerce-list",
  templateUrl: "./commerce-list.component.html",
  styleUrls: ["./commerce-list.component.css"],
})
export class CommerceListComponent implements OnInit, OnDestroy {
  commerces = [];
  totalCommerces = 0;
  numeroPaginas = 1;
  numeroItemsPorPagina = 7;
  listaPaginasSelected = [];
  listaNumeroPaginas = [];
  currentPage = 1;
  coordinates: LocalCoordinates;
  selectedCategory;
  // =========================================
  // Close subs
  // =========================================
  categoryServiceSub: Subscription;
  commerceServiceSub: Subscription;
  commerceServiceSub1: Subscription;
  commerceServiceSub2: Subscription;
  ommerceServiceSub1: Subscription;

  constructor(
    private commerceService: CommerceService,
    private placeService: PlaceService,
    private categoryService: CategoryService,
    private _analyticsService: AnalyticsService
  ) {}

  ngOnInit(): void {
    this.categoryServiceSub = this.categoryService.categorySelectedChanged.subscribe(
      (data) => {
        this.selectedCategory = data;
        this.currentPage = 1;
      }
    );
    this.placeService.getSelectedCoordinates().subscribe(coordinates => {
      this.coordinates = coordinates;
    });

    this.commerceServiceSub = this.commerceService.commerceResultListChanged.subscribe(
      (data) => {
        this.commerces = data;
      }
    );
    this.commerceServiceSub1 = this.commerceService.totalCommercesChanged.subscribe(
      (data) => {
        this.listaNumeroPaginas = [];
        this.listaPaginasSelected = [];
        this.totalCommerces = data;
        this.numeroPaginas = Math.ceil(
          this.totalCommerces / this.numeroItemsPorPagina
        );
        for (let i = 0; i < this.numeroPaginas; i++) {
          this.listaNumeroPaginas.push(i + 1);
          this.listaPaginasSelected.push(false);
        }
        this.listaPaginasSelected[this.currentPage - 1] = true;
      }
    );
    this.selectedCategory = this.categoryService.getCategorySelected();
    this.commerces = this.commerceService.getCommerceResultList();
    this.totalCommerces = this.commerceService.getTotalCommerces();
    this.numeroPaginas = Math.ceil(
      this.totalCommerces / this.numeroItemsPorPagina
    );
    for (let i = 0; i < this.numeroPaginas; i++) {
      this.listaNumeroPaginas.push(i + 1);
      this.listaPaginasSelected.push(false);
    }
    this.listaPaginasSelected[0] = true;
  }

  navigateToPage(direction) {
    if (direction === "atras") {
      if (this.currentPage === 1) {
        return;
      } else {
        this.getNextServicios(this.currentPage - 1);
      }
    } else {
      if (this.currentPage === this.listaNumeroPaginas.length) {
        return;
      } else {
        this.getNextServicios(this.currentPage + 1);
      }
    }
  }

  getNextServicios(numeroPagina) {
    this.currentPage = numeroPagina;
    for (let i = 0; i < this.listaPaginasSelected.length; i++) {
      if (i !== numeroPagina - 1) {
        this.listaPaginasSelected[i] = false;
      } else {
        this.listaPaginasSelected[i] = true;
      }
    }
    document
      .querySelector("#container-commerce-list")
      .scrollIntoView({ behavior: "smooth" });
    // tslint:disable-next-line: max-line-length
    this.commerceServiceSub2 = this.commerceService
      .getNearestCommerces(
        this.coordinates.lng,
        this.coordinates.lat,
        this.selectedCategory,
        this.currentPage,
        this.numeroItemsPorPagina
      )
      .subscribe((data) => {
        this.commerceService.setCommerceResultList(data["commercesPaginated"]);
        this.commerceService.setTotalCommerces(data["totalCommerces"]);
      });
  }

  trackWhatsAppClick() {
    this._analyticsService.incrementWhatsAppClicks(true, false, 'MX').subscribe();
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
    if (this.categoryServiceSub) {
      this.categoryServiceSub.unsubscribe();
    }
    if (this.commerceServiceSub) {
      this.commerceServiceSub.unsubscribe();
    }
    if (this.commerceServiceSub1) {
      this.commerceServiceSub1.unsubscribe();
    }
    if (this.commerceServiceSub2) {
      this.commerceServiceSub2.unsubscribe();
    }
  }
}
