import { Component, OnInit } from "@angular/core";
import { CommerceService } from "src/app/services/commerce.service";
import { AuthService } from "src/app/services/auth.service";
import { CategoryService } from "src/app/services/category.service";
import { FileService } from "src/app/services/file.service";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { DownloadExcelDialogComponent } from "../../admin/download-excel-dialog/download-excel-dialog.component";
@Component({
  selector: "app-commerces",
  templateUrl: "./commerces.component.html",
  styleUrls: ["./commerces.component.css"]
})
export class CommercesComponent implements OnInit {
  commerceList = [];
  titlesList = [];
  fecha;
  allowed = true;
  pageNumber = 1;
  categorySelected = "all";
  commerceCategories = [];

  fileName = "...";

  constructor(
    private commerceService: CommerceService,
    private authService: AuthService,
    private fileService: FileService,
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {
    setInterval(() => {
      this.fecha = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    this.loadCategoryData();
    this.commerceService
      .getAllCommerces(this.allowed, this.pageNumber, this.categorySelected)
      .subscribe(data => {
        console.log(data);
        const dataArray = new Array(data["commercesPaginated"]);
        this.commerceList = [...dataArray];
        this.commerceList = this.commerceList[0];
        if (this.commerceList.length > 0) {
          // tslint:disable-next-line: forin
          for (const key in this.commerceList[0]) {
            this.titlesList.push(key);
          }
          this.translateTitleList(this.titlesList);
        }
      });
  }

  loadCategoryData() {
    this.categoryService.getCategoryList().subscribe((data: any) => {
      this.commerceCategories = data;
    });
  }

  onSetAllowed(flag) {
    this.allowed = flag;
    this.commerceService
      .getAllCommerces(this.allowed, this.pageNumber, this.categorySelected)
      .subscribe(data => {
        const dataArray = new Array(data["commercesPaginated"]);
        this.commerceList = [...dataArray];
        this.commerceList = this.commerceList[0];
      });
  }

  translateTitleList(titleList) {
    for (let i = 0; i < titleList.length; i++) {
      switch (titleList[i]) {
        case "ownerName":
          titleList[i] = "Nombre";
          break;
        case "ownerLastName":
          titleList[i] = "Apellido";
          break;
        case "phone":
          titleList[i] = "Télefono Celular";
          break;
        case "commerceName":
          titleList[i] = "Nombre del comercio";
          break;
        case "category":
          titleList[i] = "Categoría";
          break;
        case "frecuency":
          titleList[i] = "Días de apertura";
          break;
        case "hourOpen":
          titleList[i] = "Horario de apertura";
          break;
        case "hourClose":
          titleList[i] = "Horario de cierre";
          break;
        case "city":
          titleList[i] = "Ciudad";
          break;
        case "address":
          titleList[i] = "Dirección exacta";
          break;
        case "reference":
          titleList[i] = "Referencia";
          break;
        case "commerceDescription":
          titleList[i] = "Breve descripción";
          break;
        case "createdAt":
          titleList[i] = "Fecha Registro";
          break;
        case "commercePhoto":
          titleList[i] = "Foto";
          break;
        case "showCommerce":
          titleList[i] = "Estatus";
          break;
      }
    }
  }

  parseDates(miliseconds) {
    return new Date(miliseconds);
  }

  onSetCategory(category) {
    console.log(category);
    this.categorySelected = category;
    this.commerceService
      .getAllCommerces(this.allowed, this.pageNumber, this.categorySelected)
      .subscribe(data => {
        const dataArray = new Array(data["commercesPaginated"]);
        this.commerceList = [...dataArray];
        this.commerceList = this.commerceList[0];
      });
  }

  onLogout() {
    this.authService.logoutUser(localStorage.getItem("rol"));
  }

  openDialogDownloadExcel() {
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = "300px";
    configuracionDialog.width = "400px";
    configuracionDialog.data = {};
    const dialogRef = this.dialog.open(
      DownloadExcelDialogComponent,
      configuracionDialog
    );
  }
}
