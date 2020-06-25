import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MapsAPILoader } from '@agm/core';
import { CommerceService } from 'src/app/services/commerce.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlaceService } from 'src/app/services/place.service';
import { LatLng } from "leaflet";

declare let google: any;

@Component({
  selector: "app-map-search-dialog",
  templateUrl: "./map-search-dialog.component.html",
  styleUrls: ["./map-search-dialog.component.css"],
})
export class MapSearchDialogComponent implements OnInit {

  mapZoom = 18;
  lat = -0.1840506;
  lng = -78.503374;
  center = new LatLng(this.lat, this.lng);
  markLat;
  markLng;
  category;
  itemsPerPage = 7;
  type;
  myStyles =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
  ];

  constructor(
    private dialogRef: MatDialogRef<MapSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data, private commerceService: CommerceService,
      private categoryService: CategoryService, private placeService: PlaceService
  ) {
    this.center = new LatLng(data.lat, data.lng);
    this.lat = data.lat;
    this.lng = data.lng;
    this.markLat = this.lat;
    this.markLng = this.lng;
    this.category = data.category;
    this.type = data.type;
  }

  ngOnInit(): void {

  }

  onMapClick(latlng: LatLng) {
    this.center = latlng;
    this.setMarker(latlng);
    this.getAddress(latlng.lat, latlng.lng);
  }

  setMarker($event) {
    this.markLat = $event.lat;
    this.markLng = $event.lng;
    this.lat = this.markLat;
    this.lng = this.markLng;
  }

  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.mapZoom = 18;
          this.lat = pos.lat;
          this.lng = pos.lng;
          this.markLat = pos.lat;
          this.markLng = pos.lng;
        },
        () => {}
      );
    } else {
      alert(
        'Tu navegador no soporta geolocalización! Selecciona tu dirección manualmente'
      );
    }
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
          } else {
            alert(
              'No hay dirección disponible en este momento, llenela manualmente'
            );
          }
        }
      });
    }
  }

  onSearchCommerce() {
    this.placeService.setSelectedCoordinates(this.lat, this.lng);
    this.categoryService.getInformationCategoryTable(this.lng, this.lat)
    .subscribe((data) => {
      this.categoryService.setTotalCategories(data);
    })
    this.categoryService.setCategorySelected(this.category);
    this.commerceService.getNearestCommerces(this.lng, this.lat, 'all', 1, this.itemsPerPage)
    .subscribe((data) => {
      this.commerceService.setTotalCommercesAllCategories(data['totalCommerces']);
    });
    this.commerceService.getNearestCommerces(this.lng, this.lat, this.category, 1, this.itemsPerPage)
    .subscribe((data) => {
      this.commerceService.setCommerceResultList(data['commercesPaginated']);
      this.commerceService.setTotalCommerces(data['totalCommerces']);
      this.dialogRef.close('ok');
    });
    this.commerceService.getTotalNearestCommerces(this.lng, this.lat, this.category)
    .subscribe((data) => {
      this.commerceService.setTotalCommerceResultList(data);
    });
  }


  close() {
    this.dialogRef.close();
  }
}
