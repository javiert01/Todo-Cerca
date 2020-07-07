import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { CommerceService } from "src/app/services/commerce.service";
import { AuthService } from "src/app/services/auth.service";
import { CategoryService } from "src/app/services/category.service";
import { FileService } from "src/app/services/file.service";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { DownloadExcelDialogComponent } from "../../admin/download-excel-dialog/download-excel-dialog.component";
import { DeleteCommerceDialogComponent } from "src/app/dialogs/delete-commerce-dialog/delete-commerce-dialog.component";
import { AllowCommerceDialogComponent } from "src/app/dialogs/allow-commerce-dialog/allow-commerce-dialog.component";
import { EditCommerceDialogComponent } from "src/app/dialogs/edit-commerce-dialog/edit-commerce-dialog.component";
import { Subscription } from "rxjs";
import { tap } from "rxjs/internal/operators/tap";
import { DinamicUrlService } from "src/app/services/dinamic-url.service";
import { AnalyticsService } from 'src/app/services/Analytics/analytics.service';
@Component({
  selector: "app-commerces",
  templateUrl: "./commerces.component.html",
  styleUrls: ["./commerces.component.css"],
})
export class CommercesComponent implements OnInit, OnDestroy {
  commerceList = [];
  titlesList = [
    "id",
    "Categoría",
    "Nombre del comercio",
    "Ciudad",
    "Dirección",
    "Horario de apertura	",
    "Horario de cierre",
    "Nombre Contacto",
    "Apellido Contacto",
    "Teléfono Contacto	",
    "Mail Contacto",
    "Foto",
    "Fecha Registro",
  ];
  fecha;
  allowed = true;
  allSelected = false;
  categorySelected = "all";
  commerceCategories = [];
  numeroPaginas = 1;
  numeroItemsPorPagina = 15;
  listaPaginasSelected = [];
  listaNumeroPaginas = [];
  currentPage = 1;
  selectedCommercesID = [];
  isCommerceSelectedList = [];
  fileName = "...";
  isSearching = false;
  rol = localStorage.getItem("rol");
  userName = localStorage.getItem("username") || "ATC";
  allCommerceSubscription: Subscription;
  searchCommerceSubscription: Subscription;
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  citySelected = "all";

  // ===========================
  // varaibles for registers
  // ===========================
  createUntilYesterday = 0;
  createdNow = 0;
  allCommerces = 0;
  allowedCommerces = 0;
  deleted = 0;
  pendings = 0;

  // ===============================================================
  // BEGIN ARRAY TO CITIES
  // ===============================================================
  cities = this._dinamicUrl.cities;
  // ===============================================================
  // END ARRAY TO CITIES
  // ===============================================================

  // ===============================================================
  // FLAG FOR PRODUCTION AND TEST, ONLY USE FOR DIVS WITH NGIF
  // ===============================================================
  production = true;

  // ==================================================================
  // TOTAL COMMERCES FOR CITY AND ALL, VALUE THAT IT SHOWED IN COMBOBOX
  // ==================================================================
  allCommercesPerCategory;

  // Total WhatsApp clicks
  whatsAppClicks = 0;

  constructor(
    private commerceService: CommerceService,
    private authService: AuthService,
    private fileService: FileService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    public _dinamicUrl: DinamicUrlService,
    private _analyticsService: AnalyticsService
  ) {
    setInterval(() => {
      this.fecha = new Date();
    }, 1000);
  }

  ngOnInit(): void {
    this._analyticsService.countWhatsAppClicksByCountry(this._dinamicUrl.getCountryCode()).subscribe(response => {
      const { fromCommercesListCount, fromCommercesMapCount } = response;
      this.whatsAppClicks = fromCommercesListCount + fromCommercesMapCount;
    }, error => {
      console.log('xxxErrorWhatsAppClicksCount', error);
    });
    if (this.authService.isTokenExpired()) {
      this.authService.logoutUser("Admin");
    }
    setInterval(() => {
      if (this.authService.isTokenExpired()) {
        this.authService.logoutUser("Admin");
      }
    }, 30000);
    this.loadCategoryData();
    this.allCommerceSubscription = this.commerceService
      .getAllCommerces(
        this.allowed,
        this.currentPage,
        this.categorySelected,
        this.citySelected
      )
      .subscribe((data) => {
        // console.log(data);
        const dataArray = new Array(data["commercesPaginated"]);
        this.commerceList = [...dataArray];
        this.commerceList = this.commerceList[0];
        this.numeroPaginas = Math.ceil(
          data["totalCommerces"] / this.numeroItemsPorPagina
        );
        this.setallCommercesPerCategory(data["totalCommerces"]);
        for (let i = 0; i < this.numeroPaginas; i++) {
          this.listaNumeroPaginas.push(i + 1);
          this.listaPaginasSelected.push(false);
        }
        this.listaPaginasSelected[0] = true;
        if (this.commerceList.length > 0) {
          console.log(this.titlesList);
          for (const commerce of this.commerceList) {
            this.isCommerceSelectedList.push(false);
          }
        }
      });
    this.getCommercesRegisterData();
  }

  loadCommerceList() {
    this.isSearching = false;
    this.listaNumeroPaginas = [];
    this.listaPaginasSelected = [];
    this.selectedCommercesID = [];
    this.isCommerceSelectedList = [];
    this.allSelected = false;
    if (this.allCommerceSubscription) {
      this.allCommerceSubscription.unsubscribe();
    }
    this.allCommerceSubscription = this.commerceService
      .getAllCommerces(
        this.allowed,
        this.currentPage,
        this.categorySelected,
        this.citySelected
      )
      .subscribe((data) => {
        console.log("Prueba test", data);
        const dataArray = new Array(data["commercesPaginated"]);
        this.commerceList = [...dataArray];
        this.commerceList = this.commerceList[0];
        this.numeroPaginas = Math.ceil(
          data["totalCommerces"] / this.numeroItemsPorPagina
        );
        this.setallCommercesPerCategory(data["totalCommerces"]);
        for (let i = 0; i < this.numeroPaginas; i++) {
          this.listaNumeroPaginas.push(i + 1);
          this.listaPaginasSelected.push(false);
        }
        for (const commerce of this.commerceList) {
          this.isCommerceSelectedList.push(false);
        }
        this.listaPaginasSelected[this.currentPage - 1] = true;
        console.log("numero paginas array", this.listaNumeroPaginas);
      });
  }

  loadCategoryData() {
    this.categoryService
      .getCategotyListDynamic(this.allowed, this.citySelected)
      //.getCategoryList()
      .subscribe((data: any) => {
        console.log("Informacion", data);
        this.commerceCategories = data;
      });
  }

  onSetAllowed(flag) {
    if (this.authService.isTokenExpired()) {
      this.authService.logoutUser("Admin");
    }
    this.currentPage = 1;
    this.allowed = flag;
    this.isSearching ? this.onSearchTerm() : this.loadCommerceList();
    this.loadCategoryData();
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
    this.isSearching ? this.onSearchTerm() : this.loadCommerceList();
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

  parseDates(miliseconds) {
    return new Date(miliseconds);
  }

  onSetCategory(category) {
    if (this.authService.isTokenExpired()) {
      this.authService.logoutUser("Admin");
    }
    this.currentPage = 1;
    this.categorySelected = category;
    this.loadCommerceList();
  }

  onSetCity(city) {
    if (this.authService.isTokenExpired()) {
      this.authService.logoutUser("Admin");
    }
    this.currentPage = 1;
    this.citySelected = city;
    this.loadCommerceList();
    this.loadCategoryData();
  }
  onCheckCommerce(target, index) {
    this.isCommerceSelectedList[index] = true;
    if (target.checked) {
      console.log("checado");
      if (
        this.selectedCommercesID.find((element) => element === target.value)
      ) {
        return;
      } else {
        this.selectedCommercesID.push(target.value);
      }
    } else {
      console.log("deschecado");
      this.isCommerceSelectedList[index] = false;
      if (
        this.selectedCommercesID.find((element) => {
          return element + "" === target.value;
        })
      ) {
        console.log("target.value: ", parseInt(target.value));
        const targetIndex = this.selectedCommercesID.indexOf(
          parseInt(target.value)
        );
        console.log("entra aqui: ", targetIndex);
        this.selectedCommercesID.splice(targetIndex, 1);
      } else {
        return;
      }
    }
    console.log(this.selectedCommercesID);
  }

  onSelectAll(flag) {
    console.log("flag", flag);
    if (flag) {
      this.selectedCommercesID = [];
      this.allSelected = true;
      for (let i = 0; i < this.commerceList.length; i++) {
        this.isCommerceSelectedList[i] = true;
        console.log(i);
        this.selectedCommercesID.push(i);
      }
    } else {
      this.allSelected = false;
      this.selectedCommercesID = [];
      for (let i = 0; i < this.commerceList.length; i++) {
        this.isCommerceSelectedList[i] = false;
      }
    }
  }

  onLogout() {
    this.authService.logoutUser(localStorage.getItem("rol"));
  }

  getSelectedCommerces(idArray) {
    const selectedCommerces = [];
    for (let i = 0; i < idArray.length; i++) {
      selectedCommerces.push(this.commerceList[idArray[i]]);
    }
    console.log("selected commerces", selectedCommerces);
    return selectedCommerces;
  }

  onSearchTerm() {
    if (this.authService.isTokenExpired()) {
      this.authService.logoutUser("Admin");
    }
    if (!this.isSearching) {
      this.currentPage = 1;
    }
    this.isSearching = true;
    if (this.searchInput.nativeElement.value === "") {
      this.loadCommerceList();
    } else {
      this.listaNumeroPaginas = [];
      this.listaPaginasSelected = [];
      this.selectedCommercesID = [];
      this.isCommerceSelectedList = [];
      this.allSelected = false;
      if (this.searchCommerceSubscription) {
        this.searchCommerceSubscription.unsubscribe();
      }
      this.searchCommerceSubscription = this.commerceService
        .searchCommerce(
          this.searchInput.nativeElement.value,
          this.numeroItemsPorPagina,
          this.currentPage,
          this.allowed
        )
        .subscribe(
          (data) => {
            console.log("data search", data);
            const dataArray = new Array(data["commercesPaginated"]);
            this.commerceList = [...dataArray];
            this.commerceList = this.commerceList[0];
            this.numeroPaginas = Math.ceil(
              data["totalCommerces"] / this.numeroItemsPorPagina
            );
            for (let i = 0; i < this.numeroPaginas; i++) {
              this.listaNumeroPaginas.push(i + 1);
              this.listaPaginasSelected.push(false);
            }
            for (const commerce of this.commerceList) {
              this.isCommerceSelectedList.push(false);
            }
            this.listaPaginasSelected[this.currentPage - 1] = true;
            console.log("numero paginas array", this.listaNumeroPaginas);
          },
          (err) => {
            console.error("error search", err);
          }
        );
    }
  }

  onCleanSearch() {
    if (this.authService.isTokenExpired()) {
      this.authService.logoutUser("Admin");
    }
    this.searchInput.nativeElement.value = "";
    this.loadCommerceList();
  }

  openDialogDownloadExcel() {
    if (this.authService.isTokenExpired()) {
      this.authService.logoutUser("Admin");
    }
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = "300px";
    configuracionDialog.width = "400px";
    configuracionDialog.data = {
      allowed: this.allowed,
      pageNumber: this.currentPage,
      category: this.categorySelected,
      cityParam: this.citySelected,
      // disable or not butons
      commerceList: this.commerceList,
      selectedCommercesID: this.selectedCommercesID,
    };
    const dialogRef = this.dialog.open(
      DownloadExcelDialogComponent,
      configuracionDialog
    );
  }

  openDeleteCommerceDialog() {
    if (this.authService.isTokenExpired()) {
      this.authService.logoutUser("Admin");
    }
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = "350px";
    configuracionDialog.width = "450px";
    configuracionDialog.data = {
      commerces: this.getSelectedCommerces(this.selectedCommercesID),
    };
    const dialogRef = this.dialog.open(
      DeleteCommerceDialogComponent,
      configuracionDialog
    );
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data.trim() === "deleted") {
          this.loadCommerceList();
        }
      }
    });
  }

  openAllowCommerceDialog() {
    if (this.authService.isTokenExpired()) {
      this.authService.logoutUser("Admin");
    }
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = "300px";
    configuracionDialog.width = "400px";
    if (this.selectedCommercesID.length === 0) {
      for (let i = 0; i < this.commerceList.length; i++) {
        this.selectedCommercesID.push(i);
      }
    }
    configuracionDialog.data = {
      commerces: this.getSelectedCommerces(this.selectedCommercesID),
    };
    const dialogRef = this.dialog.open(
      AllowCommerceDialogComponent,
      configuracionDialog
    );
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data.trim() === "allowed") {
          this.loadCommerceList();
        }
      }
    });
  }

  openEditCommerceDialog() {
    if (this.authService.isTokenExpired()) {
      this.authService.logoutUser("Admin");
    }
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = "1000px";
    configuracionDialog.width = "600px";
    configuracionDialog.data = {
      commerces: this.getSelectedCommerces(this.selectedCommercesID)[0].id,
    };
    const dialogRef = this.dialog.open(
      EditCommerceDialogComponent,
      configuracionDialog
    );
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data.trim() === "edit") {
          this.loadCommerceList();
        }
      }
    });
  }

  getCommercesRegisterData() {
    this.commerceService
      .getCommercesRegistedData()
      .pipe(
        tap((data) => {
          console.log(data);
          this.allCommerces = data["allCommerces"];
          this.createUntilYesterday = data["createdUntilYesterday"];
          this.allowedCommerces = data["allowedCommerces"];
          this.createdNow = data["createdNow"];
          this.deleted = data["deleted"];
          this.pendings = data["pendings"];
        })
      )
      .subscribe();
  }

  setallCommercesPerCategory(numberCommerces) {
    this.allCommercesPerCategory = numberCommerces;
  }

  ngOnDestroy() {
    if (this.allCommerceSubscription) {
      this.allCommerceSubscription.unsubscribe();
    }
    if (this.searchCommerceSubscription) {
      this.searchCommerceSubscription.unsubscribe();
    }
  }
}
