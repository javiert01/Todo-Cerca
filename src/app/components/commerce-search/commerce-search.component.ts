import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MapSearchDialogComponent } from '../commerce-search/map-search-dialog/map-search-dialog.component';
import { PlaceService } from 'src/app/services/place.service';
import { CategoryService } from 'src/app/services/category.service';
import { MapsAPILoader } from '@agm/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WrongCityComponent } from 'src/app/dialogs/wrong-city/wrong-city.component';
import { Subscription } from 'rxjs';

declare let google: any;

@Component({
  selector: 'app-commerce-search',
  templateUrl: './commerce-search.component.html',
  styleUrls: ['./commerce-search.component.css'],
})
export class CommerceSearchComponent implements OnInit, OnDestroy {
  cities = [];
  categories = [];
  lat;
  lng;
  resultsObtained = false;
  searchCommerceForm: FormGroup;
  @ViewChild('recomendations')
  recomendations: ElementRef;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  @ViewChild('listContainer')
  listContainer: ElementRef;
  public searchControl: FormControl;

  // =====================================================================
  // Close subs
  // =====================================================================
  categoryServiceSub: Subscription;
  dialogRefSub: Subscription;
  dialogRef2Sub: Subscription;

  constructor(
    private dialog: MatDialog,
    private placeService: PlaceService,
    private categoryService: CategoryService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.cities = this.placeService.getCountryList();
    this.loadCategoryData();
    this.searchControl = new FormControl('');
    this.searchCommerceForm = new FormGroup({
      category: new FormControl('', Validators.required),
      city: new FormControl('Quito'),
    });
    this.searchCommerceForm.get('city').disable();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['address'],
        }
      );
      autocomplete.setComponentRestrictions({
        country: ['ec'],
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          if (this.searchElementRef.nativeElement !== '') {
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

  openDialogMapSearch() {
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = '550px';
    let dialogRef;
    if (window.innerWidth < 551) {
      configuracionDialog.minWidth = '100vw';
    } else {
      configuracionDialog.width = '640px';
    }
    if (this.searchControl.value == '') {
      configuracionDialog.height = '470px';
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            this.lat = pos.lat;
            this.lng = pos.lng;
            configuracionDialog.data = {
              lat: this.lat,
              lng: this.lng,
              category: this.searchCommerceForm.get('category').value,
              type: 'noAddress'
            };
            dialogRef = this.dialog.open(
              MapSearchDialogComponent,
              configuracionDialog
            );

            this.dialogRefSub = dialogRef.afterClosed().subscribe((data) => {
              if (data === 'ok') {
                this.resultsObtained = true;
                document
                  .querySelector('#container-commerce-list')
                  .scrollIntoView({ behavior: 'smooth' });
              }
            });
          },
          () => {}
        );
      } else {
        alert(
          'Tu navegador no soporta geolocalización! Selecciona tu dirección manualmente'
        );
        this.lat = -0.1840506;
        this.lng = -78.503374;
        configuracionDialog.data = {
          lat: this.lat,
          lng: this.lng,
          category: this.searchCommerceForm.get('category').value,
          type: 'noAddress'
        };
        dialogRef = this.dialog.open(
          MapSearchDialogComponent,
          configuracionDialog
        );
        this.dialogRefSub = dialogRef.afterClosed().subscribe((data) => {
          if (data === 'ok') {
            this.resultsObtained = true;
            document
              .querySelector('#container-commerce-list')
              .scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    } else {
      configuracionDialog.data = {
        lat: this.lat,
        lng: this.lng,
        category: this.searchCommerceForm.get('category').value,
        type: 'addressOK'
      };
      dialogRef = this.dialog.open(
        MapSearchDialogComponent,
        configuracionDialog
      );

      this.dialogRefSub = dialogRef.afterClosed().subscribe((data) => {
        if (data === 'ok') {
          this.resultsObtained = true;
          document
            .querySelector('#container-commerce-list')
            .scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  getMessage() {
    console.log('this is not allowed!');
  }

  openDialogWrongCity() {
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = '370px';
    configuracionDialog.width = '400px';
    const dialogRef = this.dialog.open(WrongCityComponent, configuracionDialog);
    this.dialogRef2Sub = dialogRef.afterClosed().subscribe((data) => {
      if (data === 'ok') {
        this.searchControl.setValue('');
      }
    });
  }

  getAddress(lat: number, lng: number) {
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
            /* this.direccion = result.formatted_address;
            this.registerForm.get('address').setValue(this.direccion); */
            if (
              !result.formatted_address.includes('Quito') &&
              !result.formatted_address.includes('Sangolquí')
            ) {
              this.ngZone.run(() => {
                this.openDialogWrongCity();
              });
            } else {
              return;
            }
            /* this.direccion = rsltAdrComponent[0].short_name; */
          } else {
            alert(
              'No hay dirección disponible en este momento, llenela manualmente'
            );
          }
        }
      });
    }
  }

  showCategories() {
    if (this.recomendations) {
      const menu_categorias = document.getElementById('menu-categorias');
      const menuIconos = document.getElementById('menu-iconos');
      const element2Position = this.listContainer.nativeElement.offsetTop;
      const scrollPosition = window.pageYOffset;
      if (scrollPosition <= element2Position) {
        menuIconos.classList.remove('menu-fixed');
        menu_categorias.classList.remove('mostrar-categorias');
      } else {
        menuIconos.classList.add('menu-fixed');
      }
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
