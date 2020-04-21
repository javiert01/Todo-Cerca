import { Component, OnInit } from '@angular/core';
import { CommerceService } from 'src/app/services/commerce.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlaceService } from 'src/app/services/place.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  categoryList = [];
  coordinates;
  selectedCategory;
  categoryControl: FormControl;
  itemsPerPage = 7;

  constructor(private commerceService: CommerceService,
              private categoryService: CategoryService,
              private placeService: PlaceService) {}

  ngOnInit(): void {
    this.categoryList = this.categoryService.categoryList;
    this.placeService.selectedCoordinatesChanged.subscribe((data) => {
      this.coordinates = data;
    });
    this.categoryService.categorySelectedChanged.subscribe((data) => {
      this.selectedCategory = data;
    })
    this.coordinates = this.placeService.getSelectedCoordinates();
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
  }

  toggleCategories() {
    const menu_categorias = document.getElementById('menu-categorias');
    menu_categorias.classList.toggle('mostrar-categorias');
  }

  scrollToRecomendations() {
    document.querySelector('#recomendations').scrollIntoView({behavior: 'smooth'});
  }

  onSelectCategory(category) {
    this.categoryService.setCategorySelected(category);
    this.commerceService.getNearestCommerces(this.coordinates.lng, this.coordinates.lat, category, 1, this.itemsPerPage).subscribe(
      (data) => {
        document.querySelector('#container-commerce-list').scrollIntoView({behavior: 'smooth'});
        this.commerceService.setCommerceResultList(data['commercesPaginated']);
        this.commerceService.setTotalCommerces(data['totalCommerces']);
      }
    );
    this.commerceService.getTotalNearestCommerces(this.coordinates.lng, this.coordinates.lat, category)
    .subscribe((data) => {
      this.commerceService.setTotalCommerceResultList(data);
    });
  }
}

