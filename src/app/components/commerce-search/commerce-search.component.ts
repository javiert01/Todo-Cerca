import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MapSearchDialogComponent } from '../commerce-search/map-search-dialog/map-search-dialog.component';
import { PlaceService } from 'src/app/services/place.service';
import { CategoryService } from 'src/app/services/category.service';
import { MapsAPILoader } from '@agm/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-commerce-search',
  templateUrl: './commerce-search.component.html',
  styleUrls: ['./commerce-search.component.css'],
})
export class CommerceSearchComponent implements OnInit {
  cities = [];
  categories = [];
  lat;
  lng;
  resultsObtained = false;
  searchCommerceForm: FormGroup;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  public searchControl: FormControl;

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
    this.searchControl = new FormControl();
    this.searchCommerceForm = new FormGroup({
      category: new FormControl('', Validators.required),
      city: new FormControl('Quito')
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
        });
      });
    });
  }

  loadCategoryData() {
    this.categoryService.getCategoryList().subscribe((data: any) => {
      this.categories = data;
    });
  }

  openDialogMapSearch() {
    const configuracionDialog = new MatDialogConfig();
    configuracionDialog.disableClose = true;
    configuracionDialog.autoFocus = true;
    configuracionDialog.height = '470px';
    configuracionDialog.width = '640px';
    configuracionDialog.data = {
      lat: this.lat,
      lng: this.lng,
      category: this.searchCommerceForm.get('category').value,
    };
    const dialogRef = this.dialog.open(
      MapSearchDialogComponent,
      configuracionDialog
    );
    dialogRef.afterClosed().subscribe((data) => {
      if (data === 'ok') {
        this.resultsObtained = true;
      }
    });
  }

  showCategories() {
    const menu_categorias = document.getElementById('menu-categorias');
    const menuIconos = document.getElementById('menu-iconos');
    const anchoNavegador = document.body.clientWidth;
    const altoPagina = document.body.clientHeight;
    const scroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (anchoNavegador <= 550) {
      if (scroll >= 1100) {
        menuIconos.classList.add('menu-fixed');
      } else {
        menuIconos.classList.remove('menu-fixed');
        menu_categorias.classList.remove('mostrar-categorias');
      }
      if (scroll >= 3200) {
        menuIconos.classList.remove('menu-fixed');
        menu_categorias.classList.remove('mostrar-categorias');
      }
    } else if (anchoNavegador > 550 && anchoNavegador <= 768) {
      if (scroll >= 900) {
        menuIconos.classList.add('menu-fixed');
      } else {
        menuIconos.classList.remove('menu-fixed');
        menu_categorias.classList.remove('mostrar-categorias');
      }
      if (scroll >= 3200) {
        menuIconos.classList.remove('menu-fixed');
        menu_categorias.classList.remove('mostrar-categorias');
      }
    } else {
      if (scroll >= 560) {
        menuIconos.classList.add('menu-fixed');
      } else {
        menuIconos.classList.remove('menu-fixed');
        menu_categorias.classList.remove('mostrar-categorias');
      }
      if (scroll >= 2100) {
        menuIconos.classList.remove('menu-fixed');
        menu_categorias.classList.remove('mostrar-categorias');
      }
    }
  }
}
