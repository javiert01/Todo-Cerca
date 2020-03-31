import { Component, OnInit } from '@angular/core';
import { CommerceService } from 'src/app/services/commerce.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-commerces',
  templateUrl: './commerces.component.html',
  styleUrls: ['./commerces.component.css']
})
export class CommercesComponent implements OnInit {
  commerceList = [];
  titlesList = [];
  fecha;
  allowed = true;
  categorySelected = 'all';
  commerceCategories = [];
  numeroPaginas = 1;
  numeroItemsPorPagina = 15;
  listaPaginasSelected = [];
  listaNumeroPaginas = [];
  currentPage = 1;
  selectedCommercesID = [];
  isCommerceSelectedList = [];

  constructor(private commerceService: CommerceService,
              private authService: AuthService,
              private categoryService: CategoryService) {
                setInterval(() => {
                  this.fecha = new Date();
                }, 1000);
              }

  ngOnInit(): void {
    this.loadCategoryData();
    this.commerceService.getAllCommerces(this.allowed, this.currentPage, this.categorySelected).subscribe(data => {
      console.log(data);
      const dataArray = new Array(data['commercesPaginated']);
      this.commerceList = [...dataArray];
      this.commerceList = this.commerceList[0];
      this.numeroPaginas = Math.ceil(
        data['totalCommerces'] / this.numeroItemsPorPagina
      );
      for (let i = 0; i < this.numeroPaginas; i++) {
        this.listaNumeroPaginas.push(i + 1);
        this.listaPaginasSelected.push(false);
      }
      this.listaPaginasSelected[0] = true;
      if (this.commerceList.length > 0) {
        // tslint:disable-next-line: forin
        for (const key in this.commerceList[0]) {
          if (key !== 'idAux' && key !== 'showCommerce') {
            this.titlesList.push(key);
          }
        }
        for (const commerce of this.commerceList) {
          this.isCommerceSelectedList.push(false);
        }
        this.translateTitleList(this.titlesList);
        this.orderTitleList();
      }
    });
  }

  loadCommerceList() {
    this.listaNumeroPaginas = [];
    this.listaPaginasSelected = [];
    this.commerceService.getAllCommerces(this.allowed, this.currentPage, this.categorySelected).subscribe(data => {
      console.log(data);
      const dataArray = new Array(data['commercesPaginated']);
      this.commerceList = [...dataArray];
      this.commerceList = this.commerceList[0];
      this.numeroPaginas = Math.ceil(
        data['totalCommerces'] / this.numeroItemsPorPagina
      );
      for (let i = 0; i < this.numeroPaginas; i++) {
        this.listaNumeroPaginas.push(i + 1);
        this.listaPaginasSelected.push(false);
      }
      this.listaPaginasSelected[this.currentPage - 1] = true;
      console.log(this.numeroPaginas);
    });
  }

  loadCategoryData() {
    this.categoryService.getCategoryList().subscribe((data: any) => {
      this.commerceCategories = data;
    });
  }

  orderTitleList() {
    this.swap(this.titlesList, 'id', this.titlesList[0]);
    this.swap(this.titlesList, 'Categoría', this.titlesList[1]);
    this.swap(this.titlesList, 'Nombre del comercio', this.titlesList[2]);
    this.swap(this.titlesList, 'Ciudad', this.titlesList[3]);
    this.swap(this.titlesList, 'Dirección', this.titlesList[4]);
    this.swap(this.titlesList, 'Horario de apertura', this.titlesList[5]);
    this.swap(this.titlesList, 'Horario de cierre', this.titlesList[6]);
    this.swap(this.titlesList, 'Nombre Contacto', this.titlesList[7]);
    this.swap(this.titlesList, 'Apellido Contacto', this.titlesList[8]);
    this.swap(this.titlesList, 'Teléfono Contacto', this.titlesList[9]);
    this.swap(this.titlesList, 'Mail Contacto', this.titlesList[10]);
  }

  swap(array, item1, item2) {
    const idItem1 = array.indexOf(item1);
    const idItem2 = array.indexOf(item2);
    array[idItem1] = item2;
    array[idItem2] = item1;
  }

  onSetAllowed(flag) {
    this.currentPage = 1;
    this.allowed = flag;
    this.loadCommerceList();
  }

  translateTitleList(titleList) {
    for (let i = 0; i < titleList.length; i++) {
      switch (titleList[i]) {
        case 'ownerName':
          titleList[i] = 'Nombre Contacto';
          break;
        case 'ownerLastName':
          titleList[i] = 'Apellido Contacto';
          break;
        case 'phone':
          titleList[i] = 'Teléfono Contacto';
          break;
        case 'commerceName':
          titleList[i] = 'Nombre del comercio';
          break;
        case 'category':
          titleList[i] = 'Categoría';
          break;
        case 'frecuency':
          titleList[i] = 'Días de apertura';
          break;
        case 'hourOpen':
          titleList[i] = 'Horario de apertura';
          break;
        case 'hourClose':
          titleList[i] = 'Horario de cierre';
          break;
        case 'city':
          titleList[i] = 'Ciudad';
          break;
        case 'address':
          titleList[i] = 'Dirección';
          break;
        case 'reference':
          titleList[i] = 'Referencia';
          break;
        case 'commerceDescription':
          titleList[i] = 'Breve descripción';
          break;
        case 'createdAt':
          titleList[i] = 'Fecha Registro';
          break;
        case 'commercePhoto':
          titleList[i] = 'Foto';
          break;
        case 'ownerEmail':
          titleList[i] = 'Mail Contacto';
          break;
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
    this.loadCommerceList();
  }

  navigateToPage(direction) {
    if (direction === 'atras') {
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

  parseDates(miliseconds) {
    return new Date(miliseconds);
  }

  onSetCategory(category) {
    this.currentPage = 1;
    this.categorySelected = category;
    this.loadCommerceList();
  }

  onCheckCommerce(target) {
    if (target.checked) {
      if (this.selectedCommercesID.find(element => element === target.value)) {
        return;
      } else {
        this.selectedCommercesID.push(target.value);
      }
    } else {
      if (this.selectedCommercesID.find(element => element === target.value)) {
        const targetIndex = this.selectedCommercesID.indexOf(target.value);
        this.selectedCommercesID.splice(targetIndex, 1);
      } else {
        return;
      }
    }
    console.log(this.selectedCommercesID);
  }

  onSelectAll(flag){
    if(flag) {
      for(let i = 0; i < this.isCommerceSelectedList.length; i++){
        this.isCommerceSelectedList[i] = true;
      }
    }else {
      for(let i = 0; i < this.isCommerceSelectedList.length; i++){
        this.isCommerceSelectedList[i] = false;
      }
    }
  }

  onLogout() {
    this.authService.logoutUser(localStorage.getItem('rol'));
  }

}
