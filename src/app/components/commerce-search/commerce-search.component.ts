import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  OnDestroy,
} from "@angular/core";
import { MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { MapSearchDialogComponent } from "../commerce-search/map-search-dialog/map-search-dialog.component";
import { PlaceService } from "src/app/services/place.service";
import { CategoryService } from "src/app/services/category.service";
import { MapsAPILoader } from "@agm/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { WrongCityComponent } from "src/app/dialogs/wrong-city/wrong-city.component";
import { Subscription } from "rxjs";
import { OnlyOnceMessageComponent } from "src/app/dialogs/only-once-message/only-once-message.component";
import { StatsService } from "src/app/services/stats.service";

declare let google: any;

@Component({
  selector: "app-commerce-search",
  templateUrl: "./commerce-search.component.html",
  styleUrls: ["./commerce-search.component.css"],
})
export class CommerceSearchComponent implements OnInit, OnDestroy {
  cities = [];
  allowedCities = [];
  categories = [];
  lat;
  lng;
  latMyUb;
  lngMyUb;
  resultsObtained = false;
  searchCommerceForm: FormGroup;
  @ViewChild("recomendations")
  recomendations: ElementRef;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  @ViewChild("listContainer")
  listContainer: ElementRef;
  public searchControl: FormControl;

  // =====================================================================
  // Close subs
  // =====================================================================
  categoryServiceSub: Subscription;
  dialogRefSub: Subscription;
  dialogRef2Sub: Subscription;
  dialogRef3Sub: Subscription;

  constructor(
    private dialog: MatDialog,
    private placeService: PlaceService,
    private categoryService: CategoryService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private statsService: StatsService
  ) {}

  ngOnInit(): void {
    this.statsService.getIsHomeVisited()
      .subscribe(isHomeVisited => {
        if (!isHomeVisited) {
          this.openMessageDialog("home");
        }
      })
    /* this.cities = this.placeService.getCountryList();
    this.cities = [...this.cities.slice(0,2)]; */
    this.allowedCities = this.placeService.getAllowedCountryList();
    this.loadCategoryData();
    this.searchControl = new FormControl("");
    this.searchCommerceForm = new FormGroup({
      category: new FormControl("", Validators.required),
      // ubicationType: new FormControl(null, Validators.required)
      // city: new FormControl('', Validators.required),
    });
    // this.searchCommerceForm.get('city').disable();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["geocode"],
        }
      );
      autocomplete.setComponentRestrictions({
        country: ["ec"],
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          if (this.searchElementRef.nativeElement !== "") {
            this.getAddress(this.lat, this.lng);
          } else {
            return;
          }
        });
      });
    });
  }

  loadCategoryData() {
    this.categoryServiceSub = this.categoryService
      .getCategoryList()
      .subscribe((data: any) => {
        this.categories = data;
      });
  }

  openDialogMapSearch(message) {
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = "550px";
    let dialogRef;
    if (window.innerWidth < 551) {
      configuracionDialog.minWidth = "100vw";
    } else {
      configuracionDialog.width = "640px";
    }
    if (message === "noAddress") {
      configuracionDialog.height = "470px";
      configuracionDialog.data = {
        lat: this.lat,
        lng: this.lng,
        category: this.searchCommerceForm.get("category").value,
        type: "noAddress",
      };
      console.log("coordinates", this.lat + " " + this.lng);
      dialogRef = this.dialog.open(
        MapSearchDialogComponent,
        configuracionDialog
      );

      this.dialogRefSub = dialogRef.afterClosed().subscribe((data) => {
        if (data === "ok") {
          this.resultsObtained = true;
          document
            .querySelector("#container-commerce-list")
            .scrollIntoView({ behavior: "smooth" });
        }
      });
    } else {
      configuracionDialog.data = {
        lat: this.lat,
        lng: this.lng,
        category: this.searchCommerceForm.get("category").value,
        type: "addressOK",
      };
      dialogRef = this.dialog.open(
        MapSearchDialogComponent,
        configuracionDialog
      );

      this.dialogRefSub = dialogRef.afterClosed().subscribe((data) => {
        if (data === "ok") {
          this.resultsObtained = true;
          document
            .querySelector("#container-commerce-list")
            .scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }

  getMessage() {
    console.log("this is not allowed!");
  }

  openDialogWrongCity() {
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = "370px";
    configuracionDialog.width = "400px";
    const dialogRef = this.dialog.open(WrongCityComponent, configuracionDialog);
    this.dialogRef2Sub = dialogRef.afterClosed().subscribe((data) => {
      if (data === "ok") {
        this.searchControl.setValue("");
        this.setInputSearch('false');
      }
    });
  }

  getAddress(lat: number, lng: number) {
    let flag = false;
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          const rsltAdrComponent = result.address_components;
          const resultLength = rsltAdrComponent.length;
          if (result != null) {
            for (let i = 0; i < this.allowedCities.length; i++) {
                for(let j = 0; j < result.address_components.length; j++) {
                  if (result.address_components[j].long_name.includes(this.allowedCities[i])) {
                    flag = true;
                    break;
                  }
                }
            }
            if (!flag) {
              this.ngZone.run(() => {
                this.openDialogWrongCity();
              });
            } else {
              return;
            }
            /* this.direccion = rsltAdrComponent[0].short_name; */
          } else {
            alert(
              "No hay dirección disponible en este momento, llenela manualmente"
            );
          }
        }
      });
    }
  }

  isLocationOnCity(cityList, lat, lng, fn) {
    let flag = false;
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };
      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          const rsltAdrComponent = result.address_components;
          const resultLength = rsltAdrComponent.length;
          if (result != null) {
            console.log("la localizacion es:", result.formatted_address);
            for (let i = 0; i < cityList.length; i++) {
              if (result.formatted_address.includes(cityList[i])) {
                flag = true;
              }
            }
            if (!flag) {
              fn(false);
            } else {
              fn(true);
            }
          } else {
            alert(
              "No hay dirección disponible en este momento, llenela manualmente"
            );
          }
        }
      });
    }
  }

  onOpenDialog() {
    this.categoryService.setCategorySelected(
      this.searchCommerceForm.get("category").value
    );
    const def = this;
    if (this.searchControl.value === "") {
      if (navigator.geolocation) {
        if (this.lat && this.lng) {
          this.isLocationOnCity(
            this.allowedCities,
            this.lat,
            this.lng,
            function (flag) {
              if (flag) {
                def.ngZone.run(() => {
                  def.openDialogMapSearch("noAddress");
                });
              } else {
                def.ngZone.run(() => {
                  def.openDialogWrongCity();
                });
              }
            }
          );
        } else {
          alert(
            "Debe permitir el acceso a la ubicación o seleccionar una calle para continuar"
          );
          navigator.geolocation.getCurrentPosition((position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            this.lat = pos.lat;
            this.lng = pos.lng;
            this.isLocationOnCity(
              this.allowedCities,
              pos.lat,
              pos.lng,
              function (flag) {
                if (flag) {
                  def.ngZone.run(() => {
                    def.openDialogMapSearch("noAddress");
                  });
                } else {
                  def.ngZone.run(() => {
                    def.openDialogWrongCity();
                  });
                }
              }
            );
          });
        }
      } else {
        alert("Su navegador no soporta geolocalizacion");
      }
    } else {
      this.openDialogMapSearch("addressOK");
    }
  }

  openMessageDialog(message) {
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = false;
    configuracionDialog.autoFocus = true;
    if (window.innerWidth < 551) {
      configuracionDialog.height = "324px";
    } else if (window.innerWidth < 769) {
      configuracionDialog.height = "424px";
    } else {
      configuracionDialog.height = "524px";
    }
    configuracionDialog.width = "500px";
    configuracionDialog.data = {
      message: message,
    };
    const dialogRef = this.dialog.open(
      OnlyOnceMessageComponent,
      configuracionDialog
    );
    this.dialogRef3Sub = dialogRef.afterClosed().subscribe((data) => {
      const def = this;
      this.statsService.setIsHomeVisited(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.latMyUb = pos.lat;
          this.lngMyUb = pos.lng;
          this.lat = pos.lat;
          this.lng = pos.lng;
          this.isLocationOnCity(this.allowedCities, pos.lat, pos.lng, function (
            flag
          ) {
            if (!flag) {
              def.ngZone.run(() => {
                def.openDialogWrongCity();
              });
            }
          });
        });
      } else {
        alert("Su navegador no soporta geolocalizacion");
      }
    });
  }

  showCategories() {
    if (this.recomendations) {
      const menu_categorias = document.getElementById("menu-categorias");
      const menuIconos = document.getElementById("menu-iconos");
      const element2Position = this.listContainer.nativeElement.offsetTop;
      const scrollPosition = window.pageYOffset;
      if (scrollPosition <= element2Position) {
        menuIconos.classList.remove("menu-fixed");
        menu_categorias.classList.remove("mostrar-categorias");
      } else {
        menuIconos.classList.add("menu-fixed");
      }
    }
  }

  setInputSearch(isMyUbication) {
    isMyUbication = (isMyUbication === 'true');
    console.log(isMyUbication);
    const searchColumnsContainer = document.getElementById(
      "search-columns-container"
    );
    const inputCalleContainer = document.getElementById("inputCalleContainer");
    const searchContainer = document.getElementById("searchContainer");
    if (isMyUbication) {
      searchColumnsContainer.classList.remove("col-4-equals");
      searchColumnsContainer.classList.add("col-3-equals");
      inputCalleContainer.classList.add("display-none");
      searchContainer.classList.add("change-width");
      this.lat = this.latMyUb;
      this.lng = this.lngMyUb;
    } else {
      searchColumnsContainer.classList.add("col-4-equals");
      searchColumnsContainer.classList.remove("col-3-equals");
      inputCalleContainer.classList.remove("display-none");
      searchContainer.classList.remove("change-width");
    }
  }

  ngOnDestroy() {
    if (this.categoryServiceSub) {
      this.categoryServiceSub.unsubscribe();
    }
    if (this.dialogRefSub) {
      this.dialogRefSub.unsubscribe();
    }
    if (this.dialogRef2Sub) {
      this.dialogRef2Sub.unsubscribe();
    }
  }
}
