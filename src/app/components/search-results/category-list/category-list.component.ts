import { Component, OnInit, OnDestroy } from "@angular/core";
import { CategoryService } from "src/app/services/category.service";
import { CommerceService } from "src/app/services/commerce.service";
import { PlaceService } from "src/app/services/place.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.css"],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categoryList = [];
  totalCategories = [];
  coordinates;
  itemsPerPage = 7;
  // =========================================
  // Close subs
  // =========================================
  placeServiceSub: Subscription;
  categoryServiceSub: Subscription;
  commerceServiceSub: Subscription;
  commerceServiceSub1: Subscription;

  constructor(
    private categoryService: CategoryService,
    private commerceService: CommerceService,
    private placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this.categoryList = this.categoryService.categoryList;
    this.addImageURL(this.categoryList);
    this.placeServiceSub = this.placeService.selectedCoordinatesChanged.subscribe(
      (data) => {
        this.coordinates = data;
      }
    );
    this.categoryServiceSub = this.categoryService.totalCategoriesChanged.subscribe(
      (data) => {
        this.totalCategories = data;
        this.addTotalComerces(this.categoryList);
      }
    );
    this.totalCategories = this.categoryService.getTotalCategories();
    this.coordinates = this.placeService.getSelectedCoordinates();
    this.addTotalComerces(this.categoryList);
  }

  addImageURL(categoryList) {
    for (let i = 0; i < categoryList.length; i++) {
      if (categoryList[i].commerceCategory === "Tienda en general") {
        categoryList[i] = {
          ...categoryList[i],
          categoryIcon: "assets/tiendasengeneral-01.svg",
        };
      } else if (categoryList[i].commerceCategory === "Tienda de abarrotes") {
        categoryList[i] = {
          ...categoryList[i],
          categoryIcon: "assets/abarrotestiendas-01.svg",
        };
      } else if (categoryList[i].commerceCategory === "Restaurante") {
        categoryList[i] = {
          ...categoryList[i],
          categoryIcon: "assets/restaurantes-01.svg",
        };
      } else if (categoryList[i].commerceCategory === "Servicios Médicos") {
        categoryList[i] = {
          ...categoryList[i],
          categoryIcon: "assets/serviciosmedicos-01.svg",
        };
      } else if (categoryList[i].commerceCategory === "Farmacia") {
        categoryList[i] = {
          ...categoryList[i],
          categoryIcon: "assets/farmacias-01.svg",
        };
      } else if (categoryList[i].commerceCategory === "Frutas/verduras") {
        categoryList[i] = {
          ...categoryList[i],
          categoryIcon: "assets/frutasverduras-01.svg",
        };
      } else if (categoryList[i].commerceCategory === "Micromercado") {
        categoryList[i] = {
          ...categoryList[i],
          categoryIcon: "assets/micromercados-01.svg",
        };
      } else if (categoryList[i].commerceCategory === "Mascotas y Veterinarios") {
        categoryList[i] = {
          ...categoryList[i],
          categoryIcon: "assets/mascotas-01.svg",
        };
      } else if (categoryList[i].commerceCategory === "Lo que sea") {
        categoryList[i] = {
          ...categoryList[i],
          categoryIcon: "assets/loquesea-01.svg",
        };
      } else if (categoryList[i].commerceCategory === "Panadería") {
        categoryList[i] = {
          ...categoryList[i],
          categoryIcon: "assets/panaderias-01.svg",
        };
      }
    }
  }

  addTotalComerces(categoryList) {
    for (let i = 0; i < this.totalCategories.length; i++) {
      for (let j = 0; j < categoryList.length; j++) {
        if (categoryList[j].id === this.totalCategories[i].id) {
          categoryList[j] = {
            ...categoryList[j],
            total: this.totalCategories[i].total,
          };
          break;
        }
      }
    }
  }

  onSelectCategory(category) {
    this.categoryService.setCategorySelected(category);
    this.commerceServiceSub = this.commerceService
      .getNearestCommerces(
        this.coordinates.lng,
        this.coordinates.lat,
        category,
        1,
        this.itemsPerPage
      )
      .subscribe((data) => {
        this.commerceService.setCommerceResultList(data["commercesPaginated"]);
        this.commerceService.setTotalCommerces(data["totalCommerces"]);
      });
    this.commerceServiceSub1 = this.commerceService
      .getTotalNearestCommerces(
        this.coordinates.lng,
        this.coordinates.lat,
        category
      )
      .subscribe((data) => {
        this.commerceService.setTotalCommerceResultList(data);
      });
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
    if (this.placeServiceSub) {
      this.placeServiceSub.unsubscribe();
    }
  }
}
