import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommerceService } from "src/app/services/commerce.service";
import { CategoryService } from "src/app/services/category.service";
import { PlaceService, LocalCoordinates } from "src/app/services/place.service";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { LatLng } from "leaflet";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  // ==============================================================
  // Close subs
  // ==============================================================
  categoryServiceSub: Subscription;
  commerceServiceSub: Subscription;
  commerceService1Sub: Subscription;
  totalCommercesSub: Subscription;

  categoryList = [];
  totalCategories = [];
  totalCommerces;
  coordinates: LocalCoordinates;
  selectedCategory;
  categoryControl: FormControl;
  itemsPerPage = 7;

  viewMap = false;
  visualizeLabel: string;
  mapCommerces: any[];

  constructor(
    private commerceService: CommerceService,
    private categoryService: CategoryService,
    private placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this.visualizeLabel = "Ver Mapa";
    this.categoryList = this.categoryService.categoryList;
    this.placeService.getSelectedCoordinates().subscribe(coordinates => {
      this.coordinates = coordinates;
    });
    this.categoryServiceSub = this.categoryService.categorySelectedChanged.subscribe(
      (data) => {
        this.selectedCategory = data;
        this.categoryControl.setValue(data);
      }
    );
    this.totalCommercesSub = this.commerceService.totalCommercesChangedAllCategory.subscribe(
      (data) => {
        console.log('data', data);
        this.totalCommerces = data;
      }
    );
    this.categoryServiceSub = this.categoryService.totalCategoriesChanged.subscribe(
      (data) => {
        this.totalCategories = data;
        this.addTotalComerces(this.categoryList);
      }
    );
    this.commerceService.totalCommercesResultListChanged.subscribe(commerces => {
      this.mapCommerces = commerces;
    });
    this.totalCategories = this.categoryService.getTotalCategories();
    this.totalCommerces = this.commerceService.getTotalCommercesAllCategories();
    this.selectedCategory = this.categoryService.getCategorySelected();
    this.categoryControl = new FormControl(this.selectedCategory);
  }


  onExpand() {
    //this.viewMap = !this.viewMap;
    //this.visualizeLabel = !this.viewMap ? "Ver Mapa" : "Ver Lista";
     const listaLocales = document.getElementById('lista-locales');
     const mapa = document.getElementById('mapa');
     const angularMap = document.getElementById('angular-map');
     angularMap.setAttribute("style",'width: 100vh; height: 100vh');
     listaLocales.classList.toggle('hide-locales');
     mapa.classList.toggle('expand-map');
     document.querySelector('#container-commerce-list').scrollIntoView({behavior: 'smooth'});
  }

  toggleCategories() {
    const menu_categorias = document.getElementById("menu-categorias");
    menu_categorias.classList.toggle("mostrar-categorias");
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

  scrollToRecomendations() {
    document
      .querySelector("#recomendations")
      .scrollIntoView({ behavior: "smooth" });
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
        document
          .querySelector("#container-commerce-list")
          .scrollIntoView({ behavior: "smooth" });
        this.commerceService.setCommerceResultList(data["commercesPaginated"]);
        this.commerceService.setTotalCommerces(data["totalCommerces"]);
      });
    this.commerceService1Sub = this.commerceService
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
    if (this.commerceService1Sub) {
      this.commerceService1Sub.unsubscribe();
    }
  }
}
