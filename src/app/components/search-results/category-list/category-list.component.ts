import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { CommerceService } from 'src/app/services/commerce.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categoryList = [];
  totalCategories = [];
  coordinates;
  constructor(private categoryService: CategoryService, private commerceService: CommerceService,
              private placeService: PlaceService) { }

  ngOnInit(): void {
    this.categoryList = this.categoryService.categoryList;
    this.addImageURL(this.categoryList);
    this.placeService.selectedCoordinatesChanged.subscribe((data) => {
      this.coordinates = data;
    })
    this.categoryService.totalCategoriesChanged.subscribe((data) => {
      this.totalCategories = data;
    });
    this.totalCategories = this.categoryService.getTotalCategories();
    this.coordinates = this.placeService.getSelectedCoordinates();
    this.addTotalComerces(this.categoryList);
    console.log(this.categoryList);
    console.log(this.totalCategories);
  }

  addImageURL(categoryList) {
    for(let i = 0; i < categoryList.length; i++) {
      if(categoryList[i].commerceCategory === 'Tienda') {
        categoryList[i] = {...categoryList[i], categoryIcon: 'assets/07-2tienda.svg'};
      } else
      if(categoryList[i].commerceCategory === 'Abarrotes') {
        categoryList[i] = {...categoryList[i], categoryIcon: 'assets/07-1abaarrotes.svg'};
      } else
      if(categoryList[i].commerceCategory === 'Restaurante') {
        categoryList[i] = {...categoryList[i], categoryIcon: 'assets/07-3restaurante.svg'};
      } else
      if(categoryList[i].commerceCategory === 'Servicios Médicos') {
        categoryList[i] = {...categoryList[i], categoryIcon: 'assets/07-7medico.svg'};
      } else
      if(categoryList[i].commerceCategory === 'Farmacia') {
        categoryList[i] = {...categoryList[i], categoryIcon: 'assets/07-8farmacias.svg'};
      } else
      if(categoryList[i].commerceCategory === 'Víveres/frutería') {
        categoryList[i] = {...categoryList[i], categoryIcon: 'assets/07-4frutas.svg'};
      } else
      if(categoryList[i].commerceCategory === 'Micromercado') {
        categoryList[i] = {...categoryList[i], categoryIcon: 'assets/07-5panaderia.svg'};
      } else
      if(categoryList[i].commerceCategory === 'Mascotas') {
        categoryList[i] = {...categoryList[i], categoryIcon: 'assets/07-6mascota.svg'};
      } else
      if(categoryList[i].commerceCategory === 'Otros') {
        categoryList[i] = {...categoryList[i], categoryIcon: 'assets/07-9otros.svg'};
      }
    }
  }

  addTotalComerces(categoryList) {
    for(let i = 0; i < this.totalCategories.length; i++) {
      for(let j = 0; j < categoryList.length; j++) {
        if(categoryList[j].id === this.totalCategories[i].id) {

          categoryList[j] = {...categoryList[j], total: this.totalCategories[i].total};
          break;
        }
      }
    }
    for(let i = 0; i < categoryList.length; i++) {
      if(!categoryList[i].total) {
        categoryList[i] = {...categoryList[i], total: 0};
      }
    }

  }

  onSelectCategory(category) {
    this.categoryService.setCategorySelected(category);
    this.commerceService.getNearestCommerces(this.coordinates.lng, this.coordinates.lat, category, 1).subscribe(
      (data) => {
        this.commerceService.setCommerceResultList(data['commercesPaginated']);
      this.commerceService.setTotalCommerces(data['totalCommerces']);
      }
    );
  }

}
