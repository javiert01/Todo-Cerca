import { Component, OnInit } from '@angular/core';
import { CommerceService } from 'src/app/services/commerce.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-commerces',
  templateUrl: './commerces.component.html',
  styleUrls: ['./commerces.component.css']
})
export class CommercesComponent implements OnInit {
  commerceList = [];
  titlesList = [];

  constructor(private commerceService: CommerceService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.commerceService.getAllCommerces().subscribe(data => {
      console.log(data);
      this.commerceList = Array(data);
      if (this.commerceList.length > 0) {
        // tslint:disable-next-line: forin
        for (const key in this.commerceList[0]) {
          this.titlesList.push(key);
        }
        this.translateTitleList(this.titlesList);
      }
    });
  }

  translateTitleList(titleList) {
    for (let i = 0; i < titleList.length; i++) {
      switch (titleList[i]) {
        case 'ownerName':
          titleList[i] = 'Nombre';
          break;
        case 'ownerLastName':
          titleList[i] = 'Apellido';
          break;
        case 'phone':
          titleList[i] = 'Télefono Celular';
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
          titleList[i] = 'Dirección exacta';
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
        case 'showCommerce':
          titleList[i] = 'Estatus';
          break;
      }
    }
  }

  parseDates(miliseconds) {
    console.log(miliseconds);
    return new Date(miliseconds);
  }

  onLogout() {
    this.authService.logoutUser(localStorage.getItem('rol'));
  }

}
