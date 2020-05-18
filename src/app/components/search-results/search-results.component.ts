import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommerceService } from "src/app/services/commerce.service";
import { CategoryService } from "src/app/services/category.service";
import { PlaceService } from "src/app/services/place.service";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  // ==============================================================
  // Close subs
  // ==============================================================
  placeServiceSub: Subscription;
  categoryServiceSub: Subscription;
  commerceServiceSub: Subscription;
  commerceService1Sub: Subscription;
  totalCommercesSub: Subscription;

  categoryList = [];
  totalCategories = [];
  totalCommerces;
  coordinates;
  selectedCategory;
  categoryControl: FormControl;
  itemsPerPage = 7;

  constructor(
    private commerceService: CommerceService,
    private categoryService: CategoryService,
    private placeService: PlaceService
  ) {}

  ngOnInit(): void {
    this.categoryList = this.categoryService.categoryList;
    this.placeServiceSub = this.placeService.selectedCoordinatesChanged.subscribe(
      (data) => {
        this.coordinates = data;
      }
    );
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
    this.totalCategories = this.categoryService.getTotalCategories();
    this.coordinates = this.placeService.getSelectedCoordinates();
    this.totalCommerces = this.commerceService.getTotalCommercesAllCategories();
    this.selectedCategory = this.categoryService.getCategorySelected();
    this.categoryControl = new FormControl(this.selectedCategory);
  }


  onExpand() {
    const listaLocales = document.getElementById('lista-locales');
    const mapa = document.getElementById('mapa');
    const angularMap = document.getElementById('angular-map');
    const iconList = document.getElementById('icon-list');
    const iconMap = document.getElementById('icon-map');
    const verMapaText = document.getElementById('ver-mapa');
    const verListaText = document.getElementById('ver-lista');
    angularMap.setAttribute("style",'width: 100vh; height: 100vh');
    listaLocales.classList.toggle('hide-locales');
    mapa.classList.toggle('expand-map');
    iconMap.classList.toggle('display-none');
    iconList.classList.toggle('display-none');
    verMapaText.classList.toggle('display-none');
    verListaText.classList.toggle('display-none');
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
    if (this.placeServiceSub) {
      this.placeServiceSub.unsubscribe();
    }
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
