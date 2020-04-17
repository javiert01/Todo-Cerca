import { Component, OnInit } from "@angular/core";
import { CommerceService } from "src/app/services/commerce.service";
import { PlaceService } from 'src/app/services/place.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: "app-commerce-list",
  templateUrl: "./commerce-list.component.html",
  styleUrls: ["./commerce-list.component.css"],
})
export class CommerceListComponent implements OnInit {
  commerces = [];
  totalCommerces = 0;
  numeroPaginas = 1;
  numeroItemsPorPagina = 15;
  listaPaginasSelected = [];
  listaNumeroPaginas = [];
  currentPage = 1;
  coordinates;
  selectedCategory;

  constructor(private commerceService: CommerceService, private placeService: PlaceService,
    private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.categorySelectedChanged.subscribe((data) => {
      this.selectedCategory = data;
    })
    this.placeService.selectedCoordinatesChanged.subscribe((data) => {
      this.coordinates = data;
    })
    this.commerceService.commerceResultListChanged.subscribe((data) => {
      this.commerces = data;
    });
    this.commerceService.totalCommercesChanged.subscribe((data) => {
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
    });
    this.selectedCategory = this.categoryService.getCategorySelected();
    this.commerces = this.commerceService.getCommerceResultList();
    this.totalCommerces = this.commerceService.getTotalCommerces();
    this.numeroPaginas = Math.ceil(
      this.totalCommerces / this.numeroItemsPorPagina
    );
    this.coordinates = this.placeService.getSelectedCoordinates();
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
    this.commerceService.getNearestCommerces(this.coordinates.lng, this.coordinates.lat, this.selectedCategory, this.currentPage)
    .subscribe((data) => {
      this.commerceService.setCommerceResultList(data['commercesPaginated']);
      this.commerceService.setTotalCommerces(data['totalCommerces']);
    });
  }
}



